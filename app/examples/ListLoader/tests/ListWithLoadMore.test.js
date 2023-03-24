import React from 'react';
import { fireEvent, render, wait } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import request from 'utils/request';
import configureStore from '../../../configureStore';
import ListWithLoadMore from '../ListWithLoadMore';
let store;
jest.mock('utils/request');
const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <ListWithLoadMore />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<ListWithLoadMore />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    request.mockImplementation(() => Promise.resolve({ status: 1 }));
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
  it('call LoadMore', async () => {
    request.mockImplementation(() =>
      Promise.resolve({
        status: 1,
        results: [
          {
            name: {
              last: 'test',
              email: 'test@234.com',
            },
          },
        ],
      }),
    );
    const { container } = componentWrapper();
    await wait(() => expect(request).toHaveBeenCalledTimes(2));
    fireEvent.click(container.querySelector('button'));
    expect(request).toHaveBeenCalled();
  });
});
