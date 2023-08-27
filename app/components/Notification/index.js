/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Waypoint } from 'react-waypoint';
import { Badge, List, Skeleton, Empty, notification, Button } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { TEST_IDS } from 'components/Notification/stub';
import {
  NotificationWrapper,
  StyledPopOver,
} from 'components/Notification/StyledNotification';
import {
  NOTIFICATION_LIMIT,
  getNotificationsMock,
} from 'components/Notification/constants';

function Notification() {
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const newNotificationsCursor = 0;

  useEffect(() => {
    setLoading(true);
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    setTimeout(() => {
      getNotificationsMock()
        .then(res => {
          if (res.status) {
            if (res.data.length !== NOTIFICATION_LIMIT) {
              setHasMore(false);
            }
            setNotificationList([...notificationList, ...res.data]);
            setLoading(false);
            setUnreadCount(res.data.length + unreadCount);
            setNewItemsLoading(false);
          } else {
            setLoading(false);
            setNewItemsLoading(false);
          }
        })
        .catch(err => {
          notification.error({ message: err.message });
          setLoading(false);
          setNewItemsLoading(false);
        });
    }, 2000);
  };

  const getNewNotificationsLoader = loaderCount => {
    const loaderArray = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < loaderCount; index++) {
      loaderArray.push(
        <Skeleton
          avatar
          title={false}
          loading={newItemsLoading || loading}
          active
          key={index}
        />,
      );
    }
    return <div className="newNotificationsLoader">{loaderArray}</div>;
  };

  const handleReadCount = () => {
    const unread = notificationList.filter(
      singleNotification => singleNotification.read === false,
    ).length;
    setUnreadCount(unread);
  };

  const handleNotificationClick = (item, index) => {
    const { read } = item;
    if (read === false) {
      const newItem = {
        ...item,
        read: true,
      };
      const currentItems = [...notificationList];
      currentItems[index] = newItem;
      setNotificationList(currentItems);
      handleReadCount();
    }
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotificationList = notificationList.map(
      updatedNotification => ({
        ...updatedNotification,
        read: true,
      }),
    );

    setNotificationList(updatedNotificationList);
  };

  const handleMoreNotifications = () => {
    setNewItemsLoading(true);
    loadNotifications();
  };

  const getNotificationContent = () => {
    const notificationsLength = notificationList.length;
    if (loading) {
      return getNewNotificationsLoader(10);
    }
    return (
      <List>
        {notificationsLength === 0 ? (
          <Empty data-testid={TEST_IDS.EMPTY_CONTAINER} />
        ) : (
          notificationList.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <List.Item
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}_${item}`}
              className={item.read === false ? 'readNotifications' : ''}
              onClick={() => handleNotificationClick(item, index)}
              data-testid={TEST_IDS.NOTIFICATION_ITEM}
            >
              <span className="notificationIcon">{item.icon}</span>
              <p className="notificationContent">{item.update}</p>
            </List.Item>
          ))
        )}
        {!loading && hasMore && (
          <Waypoint
            data-testid={TEST_IDS.INFINITE_SCROLLING}
            key={newNotificationsCursor}
            onEnter={handleMoreNotifications}
          >
            {getNewNotificationsLoader(2)}
          </Waypoint>
        )}
      </List>
    );
  };

  const setMarkAllRead = () => {
    markAllNotificationsAsRead();
    setUnreadCount(0);
  };

  const getTitle = () => (
    <>
      <p>Notifications</p>
      {unreadCount > 0 && (
        <FontAwesomeIcon
          icon={faCheck}
          title={TEST_IDS.MARK_ALL_READ}
          onClick={setMarkAllRead}
          data-testid={TEST_IDS.MARK_ALL_READ}
        />
      )}
    </>
  );

  return (
    <NotificationWrapper>
      <div className="u-mr-1 u-d-inline-block">
        <Button
          type="text"
          data-testid="badge-Cart"
          className="btn-hover-none p-4"
        >
          <StyledPopOver
            placement="bottomLeft"
            content={getNotificationContent()}
            title={getTitle}
            overlayClassName="notificationPopoverContainer"
            trigger="click"
          >
            <Badge count={unreadCount} overflowCount={9} size="small">
              <BellOutlined
                data-testid={TEST_IDS.BELL_ICON}
                className="u-font-size-xlg"
              />
            </Badge>
          </StyledPopOver>
        </Button>
      </div>
    </NotificationWrapper>
  );
}
export default Notification;
