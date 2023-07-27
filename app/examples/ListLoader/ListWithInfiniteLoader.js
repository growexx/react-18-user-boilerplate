/* eslint-disable no-plusplus */
/**
 *
 * Demo with List having Infinite Loader.
 *
 */

import React from 'react';
import { List, message, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { API_ENDPOINTS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import request from 'utils/request';
import { ListWithInfiniteLoader as StyledList } from './StyledList';
import messages from './messages';

const ListWithInfiniteLoader = () => {
  const [state, setState] = React.useState({
    data: [],
    list: [],
    loading: false,
    hasMore: true,
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadApp(true));
    fetchData(res => {
      setState({
        ...state,
        data: res.results,
        list: res.results,
        loading: false,
      });
      dispatch(loadApp(false));
    });
  }, []);

  const fetchData = callback => {
    request(API_ENDPOINTS.LIST, {
      method: 'GET',
    }).then(res => callback(res));
  };

  const handleInfiniteOnLoad = () => {
    const { data } = state;
    setState({
      loading: true,
      list: data.concat(
        [...new Array(3)].map(() => ({ loading: true, name: {} })),
      ),
    });
    if (data.length > 14) {
      message.warning(<FormattedMessage {...messages.listLoaded} />);
      setState({
        hasMore: false,
        loading: false,
        list: data,
      });
      return;
    }
    fetchData(res => {
      const listData = data.concat(res.results);
      setState({
        ...state,
        data: listData,
        list: listData,
        loading: false,
      });
    });
  };

  return (
    <StyledList>
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!state.loading && state.hasMore}
          useWindow
        >
          <List
            dataSource={state.list}
            renderItem={item => (
              <List.Item key={item.id}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={API_ENDPOINTS.LIST_AVATAR} />}
                    title={item.name.last}
                    description={item.email}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </StyledList>
  );
};

export default ListWithInfiniteLoader;
