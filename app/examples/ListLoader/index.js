/**
 *
 * Loader
 *
 */

import React from 'react';
import { Tabs } from 'antd';
import ListWithLoadMore from './ListWithLoadMore';
import ListWithPagination from './ListWithPagination';
import ListWithInfiniteLoader from './ListWithInfiniteLoader';
import { TABS } from './constants';
import { StyledList } from './StyledList';

function Loader() {
  const { TabPane } = Tabs;
  function callback(key) {
    // eslint-disable-next-line no-console
    console.log(key);
  }
  return (
    <StyledList>
      <Tabs defaultActiveKey="1" onChange={callback} data-testid="ListTab">
        <TabPane tab={TABS.TITLE.TAB_ONE} key="1">
          <ListWithInfiniteLoader />
        </TabPane>
        <TabPane tab={TABS.TITLE.TAB_TWO} key="2">
          <ListWithLoadMore />
        </TabPane>
        <TabPane tab={TABS.TITLE.TAB_THREE} key="3">
          <ListWithPagination />
        </TabPane>
      </Tabs>
    </StyledList>
  );
}

Loader.propTypes = {};

export default Loader;
