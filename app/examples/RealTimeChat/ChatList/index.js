/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { Waypoint } from 'react-waypoint';
import { isEqual, orderBy } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { List, Avatar, Skeleton, Button, ConfigProvider, Empty } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import {
  getFireStoreCollectionReference,
  getDataFromReference,
  getFireStoreDocumentReference,
} from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS, API_ENDPOINTS } from 'containers/constants';
import { updateField } from 'examples/RealTimeChat/actions';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import {
  StyledChatList,
  SingleChatContainer,
  ChatListContainer,
} from 'examples/RealTimeChat/ChatList/StyledChatList';
import { resetChatWindow } from 'examples/RealTimeChat/helper';
import { TEST_IDS, skeletonLoaderStub } from 'examples/RealTimeChat/stub';
import { NO_CHATS, CHAT_LIST_LIMIT } from 'examples/RealTimeChat/constants';
import SearchUser from 'examples/RealTimeChat/SearchUser';
class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      newChatsLoading: false,
      hasMore: true,
    };
    this.unSubscribeToChatList = [];
    this.lastChatReference = null;
    this.infiniteLoadingCursor = 0;
  }

  /**
   * setChatValuesInState - sets state value from API.
   * @param {object} querySnapshot
   */
  setChatValuesInState = async querySnapshot => {
    const {
      updateAction,
      storeData: { chatList },
    } = this.props;
    const result = [];
    const { docs } = querySnapshot;
    for (let i = 0; i <= docs.length; i++) {
      let name;
      let email;
      const data = docs[i] && docs[i].data();
      this.lastChatReference = docs[docs.length - 1];
      if (data) {
        await this.getPersonData(data).then(value => {
          const { apiUserName, apiEmail } = value;
          name = apiUserName;
          email = apiEmail;
        });
        result.push({
          ...data,
          name,
          email,
          id: docs[i].id,
        });
      }
    }
    if (chatList.length > 0) {
      const updatedChatList = chatList.map(
        chat => result.find(newChat => newChat.id === chat.id) || chat,
      );
      result.forEach(newChat => {
        if (updatedChatList.every(oldChat => oldChat.id !== newChat.id)) {
          updatedChatList.push(newChat);
        }
      });
      const sortedChats = orderBy(updatedChatList, ['updatedAt'], ['desc']);
      updateAction('chatList', sortedChats);
    } else {
      const sortedChats = orderBy(result, ['updatedAt'], ['desc']);
      updateAction('chatList', sortedChats);
    }
    if (result.length !== CHAT_LIST_LIMIT) {
      this.setState({
        hasMore: false,
      });
    }
    this.setState({
      loading: false,
      newChatsLoading: false,
    });
  };

  /**
   * subscribeToChatList - real time updates for chat list
   */
  subscribeToChatList = () => {
    const { storeData } = this.props;
    if (this.lastChatReference === null) {
      this.setState({
        loading: true,
      });
      this.unSubscribeToChatList[0] = getFireStoreCollectionReference(
        FIRESTORE_COLLECTIONS.CHAT_WINDOW,
      )
        .where(`joined.${storeData.currentUserRef.id}`, '==', true)
        .limit(CHAT_LIST_LIMIT)
        .onSnapshot(
          async querySnapshot => this.setChatValuesInState(querySnapshot),
          error => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents: ', error);
            this.setState({
              loading: false,
              newChatsLoading: false,
            });
          },
        );
    } else {
      this.setState({
        newChatsLoading: true,
      });
      this.infiniteLoadingCursor += 1;
      this.unSubscribeToChatList[
        this.unSubscribeToChatList.length
      ] = getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.CHAT_WINDOW)
        .where(`joined.${storeData.currentUserRef.id}`, '==', true)
        .limit(CHAT_LIST_LIMIT)
        .startAfter(this.lastChatReference)
        .onSnapshot(
          async querySnapshot => this.setChatValuesInState(querySnapshot),
          error => {
            // eslint-disable-next-line no-console
            console.log('Error getting documents: ', error);
            this.setState({
              loading: false,
              newChatsLoading: false,
            });
          },
        );
    }
  };

  componentDidMount() {
    // get list of chats
    this.subscribeToChatList();
  }

  componentWillUnmount() {
    const { updateAction } = this.props;
    for (let index = 0; index < this.unSubscribeToChatList.length; index++) {
      if (typeof this.unSubscribeToChatList[index] === 'function') {
        const unSubscribe = this.unSubscribeToChatList[index];
        unSubscribe();
      }
    }
    resetChatWindow(updateAction, 'chatList');
  }

  /**
   * fetchPersonData
   * @param {*} person
   * @returns person data if found
   */
  fetchPersonData = async person => {
    const docRef = await getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      person,
    );
    return getDataFromReference(docRef)
      .then(data => {
        if (data.data().email !== getUserData().email) {
          return {
            apiUserName: data.data().userName,
            apiEmail: data.data().email,
          };
        }
        return undefined;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        this.setState({
          loading: false,
          newChatsLoading: false,
        });
      });
  };

  /**
   * getPersonData - iterates through joined members in chat and gives the name
   * @param {object} item - chat item
   * @returns name and email of the chat members
   */
  getPersonData = async item => {
    let returnData = {
      apiUserName: '',
      apiEmail: '',
    };
    const chatParticipants = Object.keys(item.joined);
    const chatSize = Object.keys(item.joined).length;
    for (let index = 0; index < chatSize; index++) {
      const apiData = await this.fetchPersonData(chatParticipants[index]);
      if (apiData) {
        if (chatSize === 2) {
          returnData = apiData;
          break;
        } else if (returnData.apiUserName) {
          returnData.apiUserName = `${returnData.apiUserName}, ${
            apiData.apiUserName
          }`;
          returnData.apiEmail = `${returnData.apiEmail}, ${apiData.apiEmail}`;
        } else {
          returnData = apiData;
        }
      }
    }
    return returnData;
  };

  /**
   * handleChatListItem - to open chat window
   * @param {object} event
   */
  handleChatListItem = event => {
    const {
      updateAction,
      storeData: { selectedChatWindow },
    } = this.props;
    const { joined } = event;
    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    if (!isChatWindowOpen || !isEqual(selectedChatWindow, joined)) {
      updateAction('selectedChatWindow', joined);
    }
  };

  /**
   * getLastMessage
   * @param {*} item
   * @returns last message
   */
  getLastMessage = item => {
    if (item.chats && item.chats.length > 0) {
      const {
        storeData: { currentUserRef },
      } = this.props;
      const { message, seen } = item.chats[item.chats.length - 1];
      const isLastMessageSeen = seen.includes(currentUserRef.id);
      return (
        <p
          className={
            isLastMessageSeen
              ? 'removeMarginLeft'
              : 'removeMarginLeft lastMessage'
          }
        >
          {message}
        </p>
      );
    }
    return '';
  };

  getActions = item => {
    const { loading } = this.state;
    return (
      <Button
        type="link"
        data-testid={TEST_IDS.OPEN_CHAT_WINDOW}
        onClick={() => this.handleChatListItem(item)}
        disabled={loading}
      >
        <RightCircleOutlined />
      </Button>
    );
  };

  /**
   * getEmptyContainer
   * @returns styled message for no container
   */
  getEmptyContainer = () => (
    <div className="emptyContainer">
      <p>{NO_CHATS}</p>
    </div>
  );

  /**
   * getEmptyList
   */
  getEmptyList = () => (
    <div className="noChatContainer">
      <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        description={this.getEmptyContainer()}
      />
    </div>
  );

  /**
   * getLoaderForNewChats - skeleton loader for new chats
   */
  getLoaderForNewChats = () => {
    const { newChatsLoading } = this.state;
    const arrayWithLoaders = [];
    for (let index = 0; index < CHAT_LIST_LIMIT; index++) {
      arrayWithLoaders.push(
        <Skeleton
          avatar
          title={false}
          loading={newChatsLoading}
          active
          key={index}
        />,
      );
    }
    return <div className="newChatsLoaderContainer">{arrayWithLoaders}</div>;
  };

  /**
   * renderAllChats
   * @returns list of chats
   */
  renderAllChats = () => {
    const { loading, hasMore } = this.state;
    const stubChatList = skeletonLoaderStub();
    const {
      storeData: { chatList, selectedChatWindow, chatWindowId },
    } = this.props;
    let listData;
    if (loading) {
      listData = stubChatList;
    } else {
      listData = chatList;
    }
    const areChatsPresent = !loading && chatList.length > 0;

    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    return (
      <ChatListContainer data-testid={TEST_IDS.SCROLL_CONTAINER}>
        <div className={`searchBar ${isChatWindowOpen ? 'displayNone' : ''}`}>
          <center>
            <SearchUser />
          </center>
        </div>
        <div
          className={`demo-infinite-container ${
            isChatWindowOpen ? 'displayNone' : ''
          } ${!areChatsPresent ? 'borderNone' : ''}`}
        >
          <ConfigProvider renderEmpty={!areChatsPresent && this.getEmptyList}>
            <List
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[this.getActions(item)]}
                  className={item.id === chatWindowId ? 'activeChat' : ''}
                >
                  <SingleChatContainer>
                    <Skeleton avatar title={false} loading={loading} active>
                      <List.Item.Meta
                        avatar={<Avatar src={API_ENDPOINTS.IMAGE_SRC} />}
                        title={item.name}
                        description={this.getLastMessage(item)}
                      />
                    </Skeleton>
                  </SingleChatContainer>
                </List.Item>
              )}
            />
            {hasMore && !loading && (
              <Waypoint
                key={this.infiniteLoadingCursor}
                onEnter={() => {
                  this.subscribeToChatList();
                }}
              >
                {this.getLoaderForNewChats()}
              </Waypoint>
            )}
          </ConfigProvider>
        </div>
      </ChatListContainer>
    );
  };

  render() {
    const {
      storeData: { selectedChatWindow },
    } = this.props;
    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    return (
      <StyledChatList
        className={`${!isChatWindowOpen ? 'chatWindowClosed' : ''}`}
      >
        {this.renderAllChats()}
      </StyledChatList>
    );
  }
}

ChatList.propTypes = {
  updateAction: PropTypes.func,
  storeData: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateAction: (fieldName, fieldValue) => {
      dispatch(updateField(fieldName, fieldValue));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  storeData: makeSelectRealTimeChat(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChatList);
