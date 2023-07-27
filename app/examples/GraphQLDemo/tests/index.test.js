/**
 *
 * Tests for GraphQLDemo
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { getRatesMock } from 'graphql/Rates/ApiMocks/rates';
import { ApolloProvider } from '@apollo/client';
import configureStore from '../../../configureStore';
import GraphQLDemo from '..';
import client from '../../../graphql/client';

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
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('Should render GraphQLDemo', async () => {
    componentWrapper();
    expect(await screen.findByText('USD')).toBeTruthy();
  });

  test('renders MyComponent with Apollo Client setup', async () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <GraphQLDemo />
      </ApolloProvider>,
    );

    expect(getByText('Name')).toBeTruthy();
  });
});
