/**
 *
 * Demo With LoadMore Button and Skeleton Loader
 *
 */

import React, { useState } from 'react';
import { List, Avatar, Button, Skeleton, Spin } from 'antd';
import request from 'utils/request';
import { API_ENDPOINTS } from 'containers/constants';
import useSWR from 'swr';

const count = 3;

const ListWithLoadMore = () => {
  const [state, setState] = useState({
    initLoading: true,
    list: [],
  });
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetcher = url => {
    const { list } = state;
    setLoading(true);
    setState({
      ...state,
      list: list.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} })),
      ),
    });
    request(url, {
      method: 'GET',
    })
      .then(res => {
        const listData = list.concat(res.results);
        setState({
          ...state,
          initLoading: false,
          list: listData,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useSWR(`${API_ENDPOINTS.LIST}&count=${counter}`, fetcher);

  const onLoadMore = () => {
    setCounter(counter + 10);
  };

  const { initLoading, list } = state;
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  if (!state.list.length) {
    return <Spin />;
  }

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
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
  );
};

export default ListWithLoadMore;
