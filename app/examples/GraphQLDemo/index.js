/* eslint-disable react-hooks/rules-of-hooks */
/**
 *
 * GraphQLDemo
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'antd';
import {
  useQuery /* useMutation, useLazyQuery, useSubscription */,
} from '@apollo/client';
import {
  GET_RATES /* PUT_RATES, RATES_SUBSCRIPTION */,
} from 'graphql/Rates/rates';
import { TABLE_COLUMNS } from './constants';
const GraphQLDemo = () => {
  /**
   *  useMutation declaration
   *  const [putRates, { data }] = useMutation(PUT_RATES);
   */

  /**
   * useSubscription declaration
   * const { data, loading } = useSubscription(
   *  RATES_SUBSCRIPTION,
   * { variables: { // if any } }
   * );
   */

  const getDataSource = () => {
    // query demo
    // useQuery is called as soon as the component renders.
    // To differ this mechanism useLazyQuery is used.
    // const [loadRates, { called, loading, data }] = useLazyQuery(
    //   GET_RATES,
    //  }
    // );
    // call loadRates whenever needed
    const { loading, error, data } = useQuery(GET_RATES);
    const dataArray =
      data &&
      data.rates.map(({ currency, rate, name }, index) => ({
        key: index,
        name,
        currency,
        rate,
      }));
    return {
      loading,
      error,
      data: data && dataArray.slice(0, 20),
    };
  };
  return (
    <div>
      <Helmet>
        <title>GraphQLDemo</title>
        <meta name="description" content="Description of GraphQLDemo" />
      </Helmet>
      <Table
        data-testid="DataTable"
        pagination={false}
        columns={TABLE_COLUMNS}
        dataSource={getDataSource().data}
        loading={getDataSource().loading}
      />
      {/* 
        calling the function returned by useMutation. add the variables to pass.
        putRates({ variables: { type: input.value } })
      */}
    </div>
  );
};

export default GraphQLDemo;
