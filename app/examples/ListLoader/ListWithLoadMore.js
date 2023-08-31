/**
 *
 * Demo With LoadMore Button and Skeleton Loader
 *
 */

import React, { useState, useEffect } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import { useDispatch } from 'react-redux';

import request from 'utils/request';
import { API_ENDPOINTS } from 'containers/constants';
import { loadApp } from '../../containers/App/slice';

const count = 3;

function ListWithLoadMore() {
  const dispatch = useDispatch();
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    getData((res) => {
      setInitLoading(false);
      setData(res.results);
      setList(res.results);
    });
  }, []);

  const onChangeAppLoading = (loading) => {
    dispatch(loadApp(loading));
  };

  const getData = (callback) => {
    onChangeAppLoading(true);
    request(API_ENDPOINTS.LIST, {
      method: 'GET',
    }).then((res) => {
      onChangeAppLoading(false);
      callback(res);
    });
  };

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} })),
      ),
    );
    getData((res) => {
      const listData = list.concat(res.results);
      setData(listData);
      setList(listData);
      setLoading(false);
      // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      window.dispatchEvent(new Event('resize'));
    });
  };

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

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
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
}

export default ListWithLoadMore;
