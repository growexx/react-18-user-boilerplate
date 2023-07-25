/**
 *
 * Tests for GraphQLDemo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import configureStore from '../../../configureStore';
import { getRatesMock } from 'graphql/Rates/ApiMocks/rates';
import GraphQLDemo from '..';
let globalStore;

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <MockedProvider mocks={getRatesMock} addTypename="false">
            <GraphQLDemo />
          </MockedProvider>
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<GraphQLDemo />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  it('Should render and match the snapshot', async () => {
    await act(async () => {
      const {
        container: { firstChild },
      } = componentWrapper();
      expect(firstChild).toMatchSnapshot();
    });
  });
  it('Should render GraphQLDemo', async () => {
    componentWrapper();
    expect(await screen.findByText('USD')).toBeTruthy();
  });
});
