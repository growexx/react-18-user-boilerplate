/**
 *
 * Demo With LoadMore Button and Skeleton Loader
 *
 */

import React from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import { useDispatch } from 'react-redux';
import request from 'utils/request';
import { API_ENDPOINTS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';

const count = 3;

const ListWithLoadMore = () => {
  const [state, setState] = React.useState({
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  });

  React.useEffect(() => {
    getData(res => {
      setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }, []);

  const dispatch = useDispatch();

  const getData = callback => {
    dispatch(loadApp(true));
    request(API_ENDPOINTS.LIST, {
      method: 'GET',
    }).then(res => {
      dispatch(loadApp(false));
      callback(res);
    });
  };

  const onLoadMore = () => {
    const { data } = state;
    setState({
      ...state,
      loading: true,
      list: data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {} })),
      ),
    });
    getData(res => {
      const listData = data.concat(res.results);
      setState({
        ...state,
        data: listData,
        list: listData,
        loading: false,
      });
      // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
      window.dispatchEvent(new Event('resize'));
    });
  };

  const { initLoading, loading, list } = state;
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
      renderItem={item => (
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
};
export default ListWithLoadMore;
