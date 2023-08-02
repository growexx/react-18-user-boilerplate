/* eslint-disable no-plusplus */
/**
 *
 * Demo with List having Infinite Loader.
 *
 */

import React, { useState } from 'react';
import { List, message, Avatar, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { API_ENDPOINTS } from 'containers/constants';
import { loadApp } from 'containers/App/actions';
import request from 'utils/request';
import useSWR from 'swr';
import { ListWithInfiniteLoader as StyledList } from './StyledList';
import messages from './messages';

const ListWithInfiniteLoader = ({ onChangeAppLoading }) => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);

  const fetchData = url => {
    request(url, {
      method: 'GET',
    }).then(res => {
      setData([...data, ...res.results]);
      setList([...data, ...res.results]);
      setLoading(false);
    });
  };

  onChangeAppLoading(true);

  useSWR(`${API_ENDPOINTS.LIST}&count=${count}`, fetchData);

  onChangeAppLoading(false);

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(3)].map(() => ({ loading: true, name: {} }))),
    );

    if (count > 14) {
      message.warning(<FormattedMessage {...messages.listLoaded} />);
      setHasMore(false);
      setLoading(false);
      setList(data);
      return;
    }
    setCount(count + 1);
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

ListWithInfiniteLoader.propTypes = {
  onChangeAppLoading: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeAppLoading: loading => dispatch(loadApp(loading)),
  };
}

const withConnect = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(withConnect)(ListWithInfiniteLoader);
