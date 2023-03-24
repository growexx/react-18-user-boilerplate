/**
 *
 * Tests for ChangePassword
 *
 *
 *
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ChangePassword, { mapDispatchToProps } from '../index';
import Lodable from '../Loadable';
import configureStore from '../../../configureStore';
let store;
const props = {
  error: {
    message: 'error message',
  },
  success: {
    message: 'success message',
  },
};
const componentWrapper = Component =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <Component {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('<ChangePassword />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(ChangePassword);
    expect(firstChild).toMatchSnapshot();
  });
  it('mapDispatch to props', () => {
    const mockFn = jest.fn();
    const returnValue = mapDispatchToProps(mockFn);
    const eventObject = {
      target: {
        target: { name: 'currentPassword', value: 'test' },
      },
      preventDefault: jest.fn(),
    };
    const returnValueForSubmitData = mapDispatchToProps(mockFn);
    returnValueForSubmitData.updateField(eventObject);
    returnValueForSubmitData.submitData(eventObject);

    const eventObjectWithoutPreventDefault = {
      target: {
        value: 'test',
      },
    };
    returnValue.submitData(eventObjectWithoutPreventDefault);
    expect(mockFn).toBeCalled();
  });
  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Lodable);
    expect(firstChild).toMatchSnapshot();
  });
  it('Should Click Button', () => {
    const { container, getByPlaceholderText } = componentWrapper(
      ChangePassword,
    );
    fireEvent.change(getByPlaceholderText('Current Password'), {
      target: {
        name: 'currentPassword',
        value: 'PassWord$',
      },
    });
    fireEvent.change(getByPlaceholderText('New Password'), {
      target: { name: 'newPassword', value: 'PassWord$' },
    });
    fireEvent.change(getByPlaceholderText('Confirm Password'), {
      target: { name: 'newPassword', value: 'PassWord$' },
    });
    const preventDefault = jest.fn();
    const button = container.querySelector('button');
    fireEvent.click(button, {
      preventDefault,
    });
    expect(button).toBeTruthy();
  });
});
