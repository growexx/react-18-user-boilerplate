/* eslint-disable no-plusplus */
/**
 *
 * Demo with List having Infinite Loader.
 *
 */

import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import { API_ENDPOINTS } from 'containers/constants';
import { loadApp } from '../../containers/App/slice';
import request from 'utils/request';
import { ListWithInfiniteLoader as StyledList } from './StyledList';
import messages from './messages';

function ListWithInfiniteLoader() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    onChangeAppLoading(true);
    fetchData((res) => {
      setData(res.results);
      setList(res.results);
      setLoading(false);
      onChangeAppLoading(false);
    });
  }, []);

  const onChangeAppLoading = (loading) => {
    dispatch(loadApp(loading));
  };

  const fetchData = (callback) => {
    request(API_ENDPOINTS.LIST, {
      method: 'GET',
    }).then((res) => callback(res));
  };

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(3)].map(() => ({ loading: true, name: {} }))),
    );

    if (data.length > 14) {
      message.warning(<FormattedMessage {...messages.listLoaded} />);
      setHasMore(false);
      setLoading(false);
      setList(data);
      return;
    }

    fetchData((res) => {
      const listData = data.concat(res.results);
      setData(listData);
      setList(listData);
      setLoading(false);
    });
  };

  return (
    <StyledList>
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow
        >
          <List
            dataSource={list}
            renderItem={(item) => (
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
}

export default ListWithInfiniteLoader;
