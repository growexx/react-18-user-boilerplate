import React from 'react';
import { Tag } from 'antd';
import { statusFilters } from './constants';
import customStatusFilter from './customStatusFilter';

export const columns = [
  {
    headerName: 'User Id',
    field: 'id',
    sortable: true,
  },
  {
    headerName: 'Name',
    field: 'name',
    cellRenderer: data => {
      const firstName =
        data.data && data.data.firstName ? data.data.firstName : '';
      const lastName =
        data.data && data.data.lastName ? data.data.lastName : '';

      return `${firstName} ${lastName}`;
    },
    sortable: true,
    filter: true,
    floatingFilter: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
  },
  {
    headerName: 'Status',
    field: 'status',
    cellRenderer: data => {
      const status = data.data && data.data.status ? data.data.status : '';
      return <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>;
    },
    filter: true,
    floatingFilter: true,
    floatingFilterComponent: customStatusFilter,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
      field: 'status',
      selectOptions: statusFilters,
    },
  },
];
