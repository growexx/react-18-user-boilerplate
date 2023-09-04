import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Card, Space } from 'antd';
import {
  CHANNEL_NAME,
  FULL_GENERIC_MOMENT_DATE_FORMAT,
} from '../../containers/constants';
import { TEST_IDS } from './constants';
import { Container, MessageContainer, ActionButton } from './styled';

function MultiTabSupport() {
  const [messages, setMessages] = useState([]);
  const [localStorageMessages, setLocalStorageMessages] = useState([]);

  const sendMessageViaLocalStorage = () => {
    const currentData = JSON.parse(localStorage.getItem('message')) || [];
    const newData = [...currentData, new Date().getTime()];
    setLocalStorageMessages(newData);
    localStorage.setItem('message', JSON.stringify(newData));
  };

  const messageReceiveViaLocalStorage = ev => {
    if (ev.key === 'message') {
      try {
        const message = JSON.parse(ev.newValue);
        setLocalStorageMessages(message || localStorageMessages);
      } catch (error) {
        // Some Error
      }
    }
  };

  const sendMessageViaBroadCastChannel = () => {
    const broadcast = new BroadcastChannel(CHANNEL_NAME);
    broadcast.postMessage({
      type: 'test',
      date: new Date().getTime(),
    });
  };

  const broadcastListener = event => {
    setMessages(prevMessages => [...prevMessages, event.data.date]);
  };

  const clearLocalStorage = () => {
    setLocalStorageMessages([]);
    localStorage.setItem('message', JSON.stringify([]));
  };

  useEffect(() => {
    const listen = new BroadcastChannel(CHANNEL_NAME);
    listen.addEventListener('message', broadcastListener);

    window.addEventListener('storage', messageReceiveViaLocalStorage);
    setLocalStorageMessages(JSON.parse(localStorage.getItem('message')) || []);

    return () => {
      listen.removeEventListener('message', broadcastListener);
    };
  }, []);

  return (
    <>
      <div>Received Messages</div>
      <Container>
        <Card title="Broadcast Channel Approach with useState" bordered={false}>
          <MessageContainer>
            {messages.map(message => (
              <Space key={message}>
                {dayjs(new Date(message)).format(
                  FULL_GENERIC_MOMENT_DATE_FORMAT,
                )}
              </Space>
            ))}
          </MessageContainer>
        </Card>
        <Card title="LocalStorage Approach with useState" bordered={false}>
          <MessageContainer>
            {localStorageMessages.map(message => (
              <Space key={message}>
                {dayjs(new Date(message)).format(
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
            sendMessageViaBroadCastChannel();
            sendMessageViaLocalStorage();
          }}
        >
          Add Message
        </ActionButton>{' '}
        {localStorageMessages.length > 0 && (
          <ActionButton
            data-testid={TEST_IDS.CLEAR_LOCAL_STORAGE}
            type="secondary"
            onClick={clearLocalStorage}
          >
            Clear Local Storage
          </ActionButton>
        )}
      </Container>
    </>
  );
}

export default MultiTabSupport;
