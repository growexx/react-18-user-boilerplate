/**
 *
 * RealTimeChat
 *
 */

import React, { memo } from 'react';
import { Offline, Online } from 'react-detect-offline';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Result } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import { getUserData } from 'utils/Helper';
import { getFireStoreCollectionReference } from 'utils/firebase';
import { FIRESTORE_COLLECTIONS } from 'containers/constants';
import makeSelectRealTimeChat from 'examples/RealTimeChat/selectors';
import reducer from 'examples/RealTimeChat/reducer';
import ChatRoom from 'examples/RealTimeChat/ChatRoom';
import ChatList from 'examples/RealTimeChat/ChatList';
import {
  ChatContainer,
  StyledRealTimeChat,
} from 'examples/RealTimeChat/StyledRealTimeChat';
import {
  REDUCER_KEY,
  NO_CHATS_OPEN,
  SEARCH_USER,
  OFFLINE_MAIN_MESSAGE,
} from 'examples/RealTimeChat/constants';
import { updateField } from 'examples/RealTimeChat/actions';
import { GENERAL_MAIN_MESSAGE } from './constants';

export class RealTimeChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstTimeRendered: false,
    };
  }

  setCurrentUserRef = async () => {
    const { updateAction } = this.props;

    await getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
      .where(`email`, '==', getUserData().email)
      .get()
      .then(async querySnapshot => {
        const { docs } = querySnapshot;
        if (docs.length > 0) {
          updateAction('currentUserRef', docs[0]);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });
  };

  async componentDidMount() {
    // update currentUserRef state
    await this.setCurrentUserRef();
    this.setState({
      isFirstTimeRendered: true,
    });
  }

  render() {
    const { isFirstTimeRendered } = this.state;
    const {
      storeData: { selectedChatWindow, chatList },
    } = this.props;
    const chatRightView = chatList.length > 0 ? NO_CHATS_OPEN : SEARCH_USER;
    const isChatWindowOpen =
      selectedChatWindow && Object.keys(selectedChatWindow).length > 0;
    return (
      <div>
        <Helmet>
          <title>RealTimeChat</title>
          <meta name="description" content="Description of RealTimeChat" />
        </Helmet>
        {isFirstTimeRendered && (
          <Online>
            <StyledRealTimeChat>
              <ChatContainer>
                <ChatList />
                {isChatWindowOpen ? (
                  <ChatRoom />
                ) : (
                  <div className="noChats ">
                    <Result icon={<WechatOutlined />} title={chatRightView} />
                  </div>
                )}
              </ChatContainer>
            </StyledRealTimeChat>
          </Online>
        )}
        {!isFirstTimeRendered && (
          <Offline>
            <Result
              type="error"
              title={OFFLINE_MAIN_MESSAGE}
              subTitle={GENERAL_MAIN_MESSAGE}
            />
          </Offline>
        )}
      </div>
    );
  }
}

RealTimeChat.propTypes = {
  storeData: PropTypes.object,
  updateAction: PropTypes.func,
};

const withReducer = injectReducer({ key: REDUCER_KEY, reducer });

const mapStateToProps = createStructuredSelector({
  storeData: makeSelectRealTimeChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateAction: (fieldName, fieldValue) => {
      dispatch(updateField(fieldName, fieldValue));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withConnect,
  memo,
)(RealTimeChat);
