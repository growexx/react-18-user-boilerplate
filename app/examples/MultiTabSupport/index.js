import React, { Component } from 'react';
import moment from 'moment';
import { Card, Space, Button } from 'antd';
import styled from 'styled-components';
import {
  CHANNEL_NAME,
  FULL_GENERIC_MOMENT_DATE_FORMAT,
} from '../../containers/constants';
import { TEST_IDS } from './constants';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionButton = styled(Button)`
  width: 200px;
`;

class MultiTabSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      localStorageMessages: [],
    };
  }

  sendMessageViaLocalStorage = () => {
    const currentData = JSON.parse(localStorage.getItem('message')) || [];
    const newData = [...currentData, new Date().getTime()];
    this.setState({ localStorageMessages: newData }, () => {
      localStorage.setItem('message', JSON.stringify(newData));
    });
  };

  messageReceiveViaLocalStorage = ev => {
    if (ev.key === 'message') {
      const { localStorageMessages } = this.state;
      try {
        const message = JSON.parse(ev.newValue);
        this.setState({
          localStorageMessages: message || localStorageMessages,
        });
      } catch (error) {
        // Some Error
      }
    }
  };

  sendMessageViaBroadCastChannel() {
    const broadcast = new BroadcastChannel(CHANNEL_NAME);
    broadcast.postMessage({
      type: 'test',
      date: new Date().getTime(),
    });
  }

  broadcastListener = event => {
    const { messages } = this.state;
    this.setState({ messages: [...messages, event.data.date] });
  };

  componentDidMount() {
    this.listen = new BroadcastChannel(CHANNEL_NAME);
    this.listen.addEventListener('message', this.broadcastListener);

    window.addEventListener('storage', this.messageReceiveViaLocalStorage);
    this.setState({
      localStorageMessages: JSON.parse(localStorage.getItem('message')) || [],
    });
  }

  clearLocalStorage() {
    this.setState({
      localStorageMessages: [],
    });
    localStorage.setItem('message', JSON.stringify([]));
  }

  componentWillUnmount() {
    this.listen.removeEventListener('message', this.broadcastListener);
  }

  render() {
    const { messages, localStorageMessages } = this.state;

    return (
      <>
        <div>Received Messages</div>
        <Container>
          <Card
            title="Broadcast Channel Approach with setState"
            bordered={false}
          >
            <MessageContainer>
              {messages.map(message => (
                <Space>
                  {moment(new Date(message)).format(
                    FULL_GENERIC_MOMENT_DATE_FORMAT,
                  )}
                </Space>
              ))}
            </MessageContainer>
          </Card>
          <Card title="LocalStorage Approach with setState" bordered={false}>
            <MessageContainer>
              {localStorageMessages.map(message => (
                <Space>
                  {moment(new Date(message)).format(
                    FULL_GENERIC_MOMENT_DATE_FORMAT,
                  )}
                </Space>
              ))}
            </MessageContainer>
          </Card>
        </Container>
        <Container>
          <ActionButton
            data-testid={TEST_IDS.ADD_MESSAGE}
            type="primary"
            onClick={() => {
              this.sendMessageViaBroadCastChannel();
              this.sendMessageViaLocalStorage();
            }}
          >
            Add Message
          </ActionButton>{' '}
          {localStorageMessages.length > 0 ? (
            <ActionButton
              data-testid={TEST_IDS.CLEAR_LOCAL_STORAGE}
              type="secondary"
              onClick={() => {
                this.clearLocalStorage();
              }}
            >
              Clear Local Storage
            </ActionButton>
          ) : null}
        </Container>
      </>
    );
  }
}

export default MultiTabSupport;
