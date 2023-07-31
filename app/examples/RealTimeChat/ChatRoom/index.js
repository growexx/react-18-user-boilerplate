/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import React, { Component, createRef } from 'react';
import moment from 'moment';
import { cloneDeep, isEqual } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import { Card, Form, Input, Button, Skeleton } from 'antd';
import {
  getDataFromReference,
  addFirestoreDocumentData,
  getFireStoreDocumentReference,
  setFirestoreDocumentData,
  getFireStoreCollectionReference,
} from 'utils/firebase';
import { getUserData } from 'utils/Helper';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import { MESSAGE_TIMESTAMP } from 'examples/RealTimeChat/constants';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import { StyledChatRoom } from 'examples/RealTimeChat/ChatRoom/StyledChatRoom';
import { updateField } from 'examples/RealTimeChat/actions';
import { resetChatWindow } from 'examples/RealTimeChat/helper';
import { TEST_IDS } from 'examples/RealTimeChat/stub';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChats: [],
      messageToSend: '',
      loading: false,
    };
    this.unSubscribeToWindow = null;
    this.currentChatWindow = null;
    this.messagesEndRef = createRef();
  }

  /**
   * updateChatWindowData - updates chat window
   * @param {object} payload
   */
  updateChatWindowData = async payload => {
    // eslint-disable-next-line no-param-reassign
    payload.updatedAt = new Date();
    await setFirestoreDocumentData(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
      this.currentChatWindow,
      payload,
      { merge: true },
    )
      .then(() => {})
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error writing document: ', error);
      });
  };

  /**
   * handleSeenFlagForPreviousMessage - update seen flag for previous message
   */
  handleSeenFlagForPreviousMessage = () => {
    const { userChats } = this.state;
    const newChats = cloneDeep(userChats);
    const {
      storeData: { currentUserRef },
    } = this.props;
    if (userChats.length > 0) {
      const { from } = newChats[userChats.length - 1];
      const isCurrentUser = from.id === currentUserRef.id;
      if (!isCurrentUser) {
        const { seen } = newChats[userChats.length - 1];
        if (!seen.includes(currentUserRef.id)) {
          newChats[userChats.length - 1].seen.push(currentUserRef.id);
          this.setState({
            userChats: newChats,
          });
        }
        return true;
      }
    }
    return false;
  };

  /**
   * setInitialChats
   * @param {String}} uniqueId
   * @param {Object} data
   */
  setInitialChats = (uniqueId, data) => {
    this.currentChatWindow = uniqueId;
    this.setState({
      userChats: data.chats,
    });
  };

  /**
   * createNewChatWindow - if window does not exits it creates one
   */
  createNewChatWindow = async () => {
    const {
      storeData: { selectedChatWindow, currentUserRef },
      updateAction,
    } = this.props;
    console.log('selected CHat', selectedChatWindow);
    console.log('current user', currentUserRef);
    const payload = {
      chats: [],
      createdAt: new Date(),
      createdBy: currentUserRef.ref,
      joined: selectedChatWindow,
      updatedAt: new Date(),
    };
    await addFirestoreDocumentData(FIRESTORE_COLLECTIONS.CHAT_WINDOW, payload)
      .then(async docRef => {
        updateAction('chatWindowId', docRef.id);
        this.setInitialChats(docRef.id, payload);
        await this.setUserRefsAndValues(payload);
        await this.subscribeToWindow(docRef.id);
        this.setState({
          loading: false,
        });
        // eslint-disable-next-line no-console
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error adding document: ', error);
        this.setState({
          loading: false,
        });
      });
  };

  /**
   * subscribeToWindow - listen to updates in chat
   * @param {string} chatWindow
   */
  subscribeToWindow = async chatWindow => {
    this.unSubscribeToWindow = await getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
      chatWindow,
    ).onSnapshot(doc => {
      this.setState({
        userChats: doc.data().chats,
      });
    });
  };

  /**
   * fetchPersonData
   * @param {object} person
   * @returns value from reference
   */
  fetchPersonData = async person => {
    const docRef = await getFireStoreDocumentReference(
      FIRESTORE_COLLECTIONS.PROFILE,
      person,
    );
    const returnData = await getDataFromReference(docRef)
      .then(data => data.data())
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        this.setState({
          loading: false,
        });
      });
    return { userData: returnData, reference: docRef };
  };

  /**
   * setUserRefsAndValues
   * @param {object} data
   */
  setUserRefsAndValues = async data => {
    const { joined } = data;
    const { updateAction } = this.props;
    const newRefs = [];
    const newValues = [];
    const chatParticipants = Object.keys(joined);
    for (let index = 0; index < chatParticipants.length; index++) {
      const userValue = await this.fetchPersonData(chatParticipants[index]);
      if (userValue.userData.email === getUserData().email) {
        updateAction('currentUserValue', userValue.userData);
      } else {
        newRefs.push(userValue.reference);
        newValues.push(userValue.userData);
      }
    }
    updateAction('receiverUserRefs', newRefs);
    updateAction('receiverUserValues', newValues);
  };

  /**
   * setCurrentChatWindow - initialize current chat window
   */
  setCurrentChatWindow = async () => {
    const {
      storeData: { selectedChatWindow },
      updateAction,
    } = this.props;
    this.setState({
      loading: true,
    });
    await getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.CHAT_WINDOW)
      .where(`joined`, '==', selectedChatWindow)
      .get()
      .then(async querySnapshot => {
        const { docs } = querySnapshot;
        if (docs.length > 0) {
          updateAction('chatWindowId', docs[0].id);
          this.setInitialChats(docs[0].id, docs[0].data());
          await this.setUserRefsAndValues(docs[0].data());
          await this.subscribeToWindow(docs[0].id);
          if (this.handleSeenFlagForPreviousMessage()) {
            await this.updateChatWindowData({
              chats: this.state.userChats,
            });
          }
          this.setState({
            loading: false,
          });
        } else {
          await this.createNewChatWindow();
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
        this.setState({
          loading: false,
        });
      });
  };

  scrollToBottom = () => {
    if (
      this.messagesEndRef &&
      this.messagesEndRef.current &&
      this.messagesEndRef.current.scrollIntoView
    ) {
      this.messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  componentDidUpdate(prevProps) {
    const {
      storeData: { selectedChatWindow },
    } = this.props;
    const {
      storeData: { selectedChatWindow: oldChatWindow },
    } = prevProps;
    if (oldChatWindow && !isEqual(selectedChatWindow, oldChatWindow)) {
      this.setCurrentChatWindow();
    }
  }

  async componentDidMount() {
    await this.setCurrentChatWindow();
  }

  /**
   * handleSend - new message
   */
  handleSend = () => {
    const { userChats, messageToSend } = this.state;
    this.handleSeenFlagForPreviousMessage();
    const {
      storeData: { currentUserRef },
    } = this.props;
    const message = {
      message: messageToSend.trim(),
      type: 'text',
      createdAt: new Date(),
      from: currentUserRef.ref,
      seen: [currentUserRef.id],
    };

    const payload = {
      chats: [...userChats, message],
    };
    this.updateChatWindowData(payload);
    this.setState({
      messageToSend: '',
    });
    this.scrollToBottom();
  };

  getClassNames = isCurrentUser => {
    if (isCurrentUser) {
      return `messageSent messageSentLast`;
    }
    return `messageReceived messageReceivedLast`;
  };

  /**
   * renderSingleMessage
   * @param {object} message
   * @param {number} index
   * @returns message UI
   */
  renderSingleMessage = (messageObject, index) => {
    const { loading } = this.state;

    if (loading) {
      return (
        <span
          className={index % 2 === 0 ? 'messageSent' : 'messageReceived'}
          key={`${index}_`}
        >
          <Skeleton active loading />
        </span>
      );
    }
    const {
      storeData: { currentUserRef },
    } = this.props;
    const { createdAt, from, message } = messageObject;
    const formattedMessageTimeStamp = moment(createdAt.toDate()).format(
      MESSAGE_TIMESTAMP,
    );
    const isCurrentUser = from.id === currentUserRef.id;
    const classNames = this.getClassNames(isCurrentUser, index);
    return (
      <p
        className={classNames}
        key={`${index}_${message}`}
        title={formattedMessageTimeStamp}
      >
        {message}
      </p>
    );
  };

  /**
   * renderMessages
   * @returns each single message
   */
  renderMessages = () => {
    const { userChats, loading } = this.state;
    let array = [];
    array = Array(10).fill(0);
    if (loading) {
      return array.map(this.renderSingleMessage);
    }
    if (userChats.length > 0) {
      const allMessages = userChats.map(this.renderSingleMessage);
      return (
        <div>
          {allMessages}
          <div ref={this.messagesEndRef} />
        </div>
      );
    }
    return <></>;
  };

  /**
   * getLastSeen
   * @returns calculate last seen
   */
  getLastSeen = () => {
    const {
      storeData: { receiverUserValues },
    } = this.props;
    if (receiverUserValues.length === 1) {
      const { lastSeen } = receiverUserValues[0];
      const formattedLastSeen = lastSeen && moment(lastSeen.toDate());
      if (moment().diff(formattedLastSeen, 'minutes') < 2) {
        return 'Online';
      }
      return `${formattedLastSeen.calendar(moment())}`;
    }
    return <></>;
  };

  /**
   * getChatWindowName
   * @returns window name filtered by joined members
   */
  getChatWindowName = () => {
    const {
      storeData: { receiverUserValues },
    } = this.props;
    let chatWindowName = '';
    if (receiverUserValues.length === 1) {
      chatWindowName = receiverUserValues[0].userName;
    } else {
      for (let index = 0; index < receiverUserValues.length; index++) {
        if (chatWindowName) {
          chatWindowName = `${chatWindowName}, ${
            receiverUserValues[index].userName
          }`;
        } else {
          chatWindowName = `${receiverUserValues[index].userName}`;
        }
      }
    }
    return chatWindowName;
  };

  closeChatWindow = () => {
    const { updateAction } = this.props;
    resetChatWindow(updateAction);
  };

  componentWillUnmount() {
    const { updateAction } = this.props;
    if (
      this.unSubscribeToWindow !== null &&
      typeof this.unSubscribeToWindow === 'function'
    ) {
      this.unSubscribeToWindow();
      resetChatWindow(updateAction);
    }
  }

  render() {
    const { messageToSend, loading } = this.state;
    return (
      <StyledChatRoom>
        <Card
          type="inner"
          title={
            <div className="chatRoomHeader">
              {loading ? (
                <Skeleton.Input style={{ width: 100 }} active size="small" />
              ) : (
                <p>
                  {this.getChatWindowName()}
                  <span>{this.getLastSeen()} </span>
                </p>
              )}

              <CloseOutlined
                data-testid={TEST_IDS.CLOSE_ICON}
                onClick={() => this.closeChatWindow()}
              />
            </div>
          }
          actions={[
            <div className="sendMessageContainer">
              <Form className="messageInput">
                <Form.Item hasFeedback>
                  <Input
                    placeholder="Enter Your Message"
                    value={messageToSend}
                    data-testid={TEST_IDS.MESSAGE_INPUT}
                    onChange={e =>
                      this.setState({ messageToSend: e.target.value })
                    }
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  data-testid={TEST_IDS.SEND_MESSAGE}
                  onClick={() => this.handleSend()}
                  disabled={!messageToSend || loading}
                >
                  Send
                </Button>
              </Form>
            </div>,
          ]}
        >
          <div className="chatRoomContainer">
            <div className="messageContainer">{this.renderMessages()}</div>
          </div>
        </Card>
      </StyledChatRoom>
    );
  }
}

ChatRoom.propTypes = {
  storeData: PropTypes.object,
  updateAction: PropTypes.func,
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

export default compose(withConnect)(ChatRoom);
