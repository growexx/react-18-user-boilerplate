/* eslint-disable no-plusplus */
/**
 *
 * Demo with List having Pagination.
 *
 */

import React from 'react';
import { List } from 'antd';
import { API_ENDPOINTS } from 'containers/constants';

const ListWithPagination = () => {
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `ant design part ${i}`,
      avatar: API_ENDPOINTS.LIST_AVATAR,
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          // eslint-disable-next-line no-console
          console.log(page);
        },
        size: 'small',
        position: 'top',
        pageSize: 3,
      }}
      dataSource={listData}
      renderItem={item => (
        <List.Item key={item.title}>
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};
ListWithPagination.propTypes = {};

export default ListWithPagination;
