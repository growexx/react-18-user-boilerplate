import React from 'react';
import {
  chatWindowStub,
  groupChatWindowStub,
} from 'examples/RealTimeChat/stub';
import {
  UserOutlined,
  CheckCircleOutlined,
  SmileOutlined,
  ExportOutlined,
  NumberOutlined,
} from '@ant-design/icons';
const NOTIFICATIONS = [
  {
    icon: <UserOutlined />,
    update: '70 new employees are shifted',
    timestamp: 1596119688264,
    read: false,
  },
  {
    icon: <CheckCircleOutlined />,
    update: 'Time to Take a Break, TADA!!!',
    timestamp: 1596119686811,
    read: false,
  },
  {
    icon: <SmileOutlined />,
    update: 'Time to Take a Break, TADA!!!',
    timestamp: 1596119686811,
    read: false,
  },
  {
    icon: <ExportOutlined />,
    update: 'Time to Take a Break, TADA!!!',
    timestamp: 1596119686811,
    read: false,
  },
  {
    icon: <NumberOutlined />,
    update: '70 new employees are shifted',
    timestamp: 1596119688264,
    read: false,
  },
];

export const TEST_IDS = {
  MARK_ALL_READ: 'Mark All As Read',
  BELL_ICON: 'BELL_ICON',
  EMPTY_CONTAINER: 'EMPTY_CONTAINER',
  INFINITE_SCROLLING: 'INFINITE_SCROLLING',
  NOTIFICATION_ITEM: 'NOTIFICATION_ITEM',
};

export const getNotificationsSuccessMock = () =>
  Promise.resolve({
    data: NOTIFICATIONS,
    status: 1,
  });
export const getNotificationsMockWithNoData = () =>
  Promise.resolve({
    data: [],
    status: 0,
  });
export const getNotificationsMockWithLessData = () =>
  Promise.resolve({
    data: [NOTIFICATIONS[0]],
    status: 1,
  });
export const getNotificationsFailureData = () =>
  Promise.reject(
    new Error({
      message: 'something went wrong',
    }),
  );

export const getNotificationsSuccessMockForClick = () =>
  Promise.resolve({
    data: [
      {
        icon:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZrv3_PEnkdOIZvnr0COONt3kL7rSSq623dB3fyLCgT7GARpReF26nPOre6JCLHKu7KQ&usqp=CAU',
        update: '70 new employees are shifted',
        timestamp: 1596119688264,
        read: false,
        clickAction: 'http://localhost:3000/features',
      },
      {
        icon: <UserOutlined />,
        update: '70 new employees are shifted',
        timestamp: 1596119688264,
        read: true,
      },
      ...NOTIFICATIONS,
    ],
    status: 1,
  });

export const getSuccessMockUserId = dataLength => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    data.push({
      email: `johndoe_${i}@gmail.com`,
      id: dataLength === 1 ? `1` : `0`,
    });
  }
  const returnData = {
    docs: data,
  };
  if (dataLength === 0) {
    return Promise.resolve({
      docs: [],
    });
  }
  return Promise.resolve(returnData);
};

export const getSuccessWindows = dataLength => {
  const docs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    docs.push({
      id: `${i}`,
      data: () => (i % 2 === 0 ? chatWindowStub(0) : groupChatWindowStub),
    });
  }
  if (dataLength === 0) {
    return {
      empty: true,
    };
  }

  return docs;
};
