import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import * as gaHelper from 'utils/googleAnalytics';
import { MenuItems } from '../constants';
import SideBar from '../index';
import configureStore from '../../../configureStore';
let globalStore;
const props = {
  user: {
    role: 1,
  },
  collapsed: true,
};
const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <SideBar {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<SideBar />', () => {
  beforeAll(() => {
    const { store } = configureStore({});
    globalStore = store;
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });

  it('Should log ga event', () => {
    const spiedEvent = jest.spyOn(gaHelper, 'eventGA');
    const { getByText } = componentWrapper();
    fireEvent.click(getByText(MenuItems[0].tabName));
    expect(spiedEvent).toHaveBeenCalled();
  });
});
