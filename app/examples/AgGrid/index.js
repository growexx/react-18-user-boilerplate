/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { PageHeader } from '@ant-design/pro-layout';
import { get } from 'lodash';
import { notification } from 'antd';
import request from 'utils/request';
import { GET_SORT_ORDER } from '../../containers/constants';
import { columns } from './column';
import { getUsersAPIMock } from '../Users/stub';

function AgGrid({ demo }) {
  let firstRender = true;
  let firstApiCalled = false;
  let reRenderTimes = 0;

  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const setDeepLinkURL = paramsObj => {
    const queryParam = `?${new URLSearchParams(paramsObj)}`;
    window.history.pushState(null, '', queryParam);
  };

  const onGridReady = params => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };

  const onGridChange = (pagination, filtersObj, filters, sorter, params) => {
    setDeepLinkURL({
      page: pagination.current,
      sortKey: sorter.columnKey,
      sortType: GET_SORT_ORDER(sorter && sorter.order),
      ...filtersObj,
    });

    loadUserDetails({
      sortType: GET_SORT_ORDER(sorter && sorter.order),
      sortKey: sorter && sorter.columnKey,
      pagination,
      params,
      filters,
    });
  };

  const loadUserDetails = ({
    sortType,
    sortKey,
    filters,
    pagination,
    params,
  }) => {
    // Add your API call hereconst filterKeys = Object.keys(newFilters);

    // let requestURL = `${API_ENDPOINTS.GET_USERS}?&page=${pagination.current}&sort=${sortType}&sortBy=${sortKey}`;
    // filterKeys.forEach(filter => {
    //   requestURL += `&${filter}=${filters[filter].filter}`;
    // });
    // request(requestURL, { method: 'GET' })
    //   .then(response => {
    //     this.setUserDetails(
    //       response,
    //       params,
    //       pagination,
    //       filters,
    //     );
    //   })
    //   .catch(error => {
    //     notification.error({
    //       message: error.message,
    //     });
    //   });

    if (demo) {
      request('requestURL', { method: 'GET' }).then(response => {
        setUserDetails(response, params, pagination);
      });
    } else {
      getUsersAPIMock({
        skip: pagination.current,
        search: filters.name ? filters.name.filter : '',
        sortKey: sortKey === 'name' ? 'firstName' : sortKey,
        sortType,
      }).then(response => {
        setUserDetails(response, params, pagination);
      });
    }
  };

  const setUserDetails = (response, params, pagination) => {
    if (get(response, 'status')) {
      const data = get(response, 'data', []);
      const length = get(response, 'pagination.total', 0);

      if (params) {
        params.successCallback(data, length);
        if (!firstRender || firstApiCalled || reRenderTimes === 1) {
          gridApi.paginationGoToPage(pagination.current - 1);
        }
      }

      firstRender = false;
      firstApiCalled = true;
      reRenderTimes -= 1;
      gridApi.hideOverlay();
    } else {
      notification.error({ message: get(response, 'message') });
    }
  };

  const getDefaultSorter = sorterParams => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('sortKey') && query.get('sortType')) {
      if (Number(query.get('sortType')) === 1) {
        if (sorterParams && sorterParams && sorterParams.length > 0) {
          return {
            columnKey: sorterParams[0].colId,
            order: sorterParams[0].sort,
          };
        }
        return {
          columnKey: 'createdAt',
          order: 'desc',
        };
      }
      if (sorterParams && sorterParams && sorterParams.length > 0) {
        return {
          columnKey: sorterParams[0].colId,
          order: sorterParams[0].sort,
        };
      }
      return {
        columnKey: 'createdAt',
        order: 'desc',
      };
    }
    return {
      columnKey: 'createdAt',
      order: 'desc',
    };
  };

  const refreshGrid = () => {
    const dataSource = {
      getRows: params => {
        const query = new URLSearchParams(window.location.search);
        reRenderTimes = Math.max(0, reRenderTimes);
        if (firstRender) {
          if (query.get('page')) reRenderTimes += 1;
          if (query.get('sortType') && query.get('sortType') !== 'createdAt')
            reRenderTimes += 1;
          if (query.get('name')) reRenderTimes += 1;
        }

        // loading
        gridApi.showLoadingOverlay();

        // pagination
        const pageFromUrl = +query.get('page') || 1;
        const pageFromGrid = params.endRow ? params.endRow / 10 : 1;
        const pagination = {
          pageSize: 10,
          current: !firstApiCalled ? pageFromUrl : pageFromGrid,
        };
        if (reRenderTimes > 0) {
          pagination.current = pageFromUrl;
        }

        // filters
        const filters = params.filterModel;
        if (filters && firstRender && Object.keys(filters).length === 0) {
          if (query.get('name')) {
            filters.name = {
              filter: query.get('name'),
              filterType: 'text',
              type: 'contains',
            };
          }
        }
        const filterKeys = Object.keys(filters);
        const filtersObj = {};
        filterKeys.forEach(filter => {
          filtersObj[filter] = filters[filter].filter;
        });
        gridApi.setFilterModel(filters);

        // sorting
        if (query.get('sortKey')) {
          if (params && params.sortModel && params.sortModel.length === 0) {
            const columnState = {
              state: firstRender
                ? [
                    {
                      colId: query.get('sortKey'),
                      sort:
                        Number(query.get('sortType')) === 1 ? 'asc' : 'desc',
                    },
                  ]
                : [],
            };
            firstRender = false;
            columnApi.applyColumnState(columnState);
          }
        }
        let sorterParams = getDefaultSorter(params.sortModel);
        if (params && params.sortModel && params.sortModel.length > 0) {
          if (params.sortModel[0].sort === 'asc') {
            sorterParams = {
              columnKey: params.sortModel[0].colId,
              order: 'ascend',
            };
          }
          if (params.sortModel[0].sort === 'desc') {
            sorterParams = {
              columnKey: params.sortModel[0].colId,
              order: 'descend',
            };
          }
        }

        // api call
        onGridChange(pagination, filtersObj, filters, sorterParams, params);
      },
    };
    gridApi.setDatasource(dataSource);
  };

  useEffect(() => {
    if (gridApi) {
      refreshGrid();
    }
  }, [gridApi]);

  return (
    <div>
      <Helmet>
        <title>AG Grid React</title>
        <meta name="description" content="AG Grid" />
      </Helmet>
      <PageHeader title="AG Grid" />
      <div className="ag-theme-quartz" style={{ height: 600 }}>
        <AgGridReact
          columnDefs={columns}
          rowModelType="infinite"
          pagination
          maxBlocksInCache={1}
          cacheBlockSize={10}
          paginationPageSize={10}
          onGridReady={onGridReady}
          suppressDragLeaveHidesColumns
          overlayNoRowsTemplate="No Users found"
          paginationPageSizeSelector={false}
          defaultColDef={{
            sortable: true,
            suppressMenu: true,
            floatingFilterComponentParams: {
              suppressFilterButton: true,
            },
          }}
          autoSizeStrategy={{
            type: 'fitGridWidth',
            defaultMinWidth: 100,
          }}
        />
      </div>
    </div>
  );
}

AgGrid.propTypes = {
  demo: PropTypes.bool,
};

AgGrid.defaultProps = {
  demo: false,
};

export default AgGrid;
