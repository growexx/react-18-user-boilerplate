/**
 * Notification/index.js
 *
 * This is the Notification Component file.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Waypoint } from 'react-waypoint';
import { Badge, List, Skeleton, Empty, notification, Button } from 'antd';
import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getFireStoreCollectionReference } from 'utils/firebase';
import { FIRESTORE_COLLECTIONS, ROUTES } from 'containers/constants';
import { getUserData } from 'utils/Helper';
import { TEST_IDS } from 'components/Notification/stub';
import {
  NotificationWrapper,
  StyledPopOver,
} from 'components/Notification/StyledNotification';
import {
  NOTIFICATION_LIMIT,
  getNotificationsMock,
} from 'components/Notification/constants';
import { withRouter } from '../../containers/App/withRouter';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItemsLoading: false,
      unreadCount: 0,
      notificationList: [],
      loading: false,
      hasMore: true,
    };
    this.newNotificationsCursor = 0;
    this.unSubscribeToNewMessages = null;
  }

  /**
   * subscribeToNewMessages - real time updates for new message
   */
  subscribeToNewMessages = async () => {
    let loggedInUserId;
    await getFireStoreCollectionReference(FIRESTORE_COLLECTIONS.PROFILE)
      .where(`email`, '==', getUserData().email)
      .get()
      .then(async querySnapshot => {
        const { docs } = querySnapshot;
        if (docs.length > 0) {
          loggedInUserId = docs[0].id;
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error getting documents: ', error);
      });

    this.unSubscribeToNewMessages = await getFireStoreCollectionReference(
      FIRESTORE_COLLECTIONS.CHAT_WINDOW,
    )
      .where(`joined.${loggedInUserId}`, '==', true)
      .onSnapshot(
        async querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              const { chats } = doc.data();
              if (chats.length > 0) {
                const { from, seen } = chats[chats.length - 1];
                if (from.id !== loggedInUserId) {
                  if (!seen.includes(loggedInUserId)) {
                    const {
                      history: {
                        location: { pathname },
                      },
                    } = this.props;
                    if (pathname !== ROUTES.REAL_TIME_CHAT) {
                      const newNotification = {
                        icon: <CheckCircleOutlined />,
                        update: 'You Have Received New Messages',
                        timestamp: 1596119686811,
                        read: false,
                      };
                      this.setState(prevState => ({
                        ...prevState,
                        notificationList: [
                          newNotification,
                          ...prevState.notificationList,
                        ],
                        loading: false,
                        unreadCount: prevState.unreadCount + 1,
                        newItemsLoading: false,
                      }));
                    }
                  }
                }
              }
            });
          }
        },
        error => {
          // eslint-disable-next-line no-console
          console.log('Error getting documents: ', error);
        },
      );
  };

  loadNotifications = () => {
    const { notificationList, unreadCount } = this.state;
    setTimeout(() => {
      getNotificationsMock()
        .then(res => {
          if (res.status) {
            if (res.data.length !== NOTIFICATION_LIMIT) {
              this.setState({
                hasMore: false,
              });
            }
            this.setState({
              notificationList: [...notificationList, ...res.data],
              loading: false,
              unreadCount: res.data.length + unreadCount,
              newItemsLoading: false,
            });
          } else {
            this.setState({
              notificationList,
              unreadCount,
              loading: false,
              newItemsLoading: false,
            });
          }
        })
        .catch(err => {
          notification.error({ message: err.message });
          this.setState({
            notificationList,
            unreadCount,
            loading: false,
            newItemsLoading: false,
          });
        });
    }, 2000);
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    this.loadNotifications();
    await this.subscribeToNewMessages();
  }

  getNewNotificationsLoader = loaderCount => {
    const { loading, newItemsLoading } = this.state;
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

  handleReadCount = () => {
    const { notificationList } = this.state;
    const unreadCount = notificationList.filter(
      singleNotification => singleNotification.read === false,
    ).length;
    this.setState({
      unreadCount,
    });
  };

  handleNotificationClick = (item, index) => {
    const { notificationList } = this.state;
    const { read } = item;
    if (read === false) {
      const newItem = {
        ...item,
        read: true,
      };
      const currentItems = [...notificationList];
      currentItems[index] = newItem;
      this.setState(
        {
          notificationList: currentItems,
        },
        () => {
          this.handleReadCount();
        },
      );
    }
  };

  markAllNotificationsAsRead = () => {
    const { notificationList } = this.state;
    const updatedNotificationList = notificationList.map(
      updatedNotification => ({
        ...updatedNotification,
        read: true,
      }),
    );
    this.setState({
      notificationList: updatedNotificationList,
    });
  };

  handleMoreNotifications = () => {
    this.setState({
      newItemsLoading: true,
    });
    this.loadNotifications();
  };

  getNotificationContent = () => {
    const { notificationList, loading, hasMore } = this.state;
    const notificationsLength = notificationList.length;
    if (loading) {
      return this.getNewNotificationsLoader(10);
    }
    return (
      <>
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
                onClick={() => this.handleNotificationClick(item, index)}
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
              key={this.newNotificationsCursor}
              onEnter={this.handleMoreNotifications}
            >
              {this.getNewNotificationsLoader(2)}
            </Waypoint>
          )}
        </List>
      </>
    );
  };

  setMarkAllRead = () => {
    this.markAllNotificationsAsRead();
    this.setState({
      unreadCount: 0,
    });
  };

  getTitle = () => {
    const { unreadCount } = this.state;
    return (
      <>
        <p>Notifications</p>
        {unreadCount > 0 && (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              title={TEST_IDS.MARK_ALL_READ}
              onClick={this.setMarkAllRead}
              data-testid={TEST_IDS.MARK_ALL_READ}
            />
          </>
        )}
      </>
    );
  };

  render() {
    const { unreadCount } = this.state;
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
              content={this.getNotificationContent()}
              title={this.getTitle}
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
}
Notification.propTypes = {
  history: PropTypes.object,
};
export default withRouter(Notification);
