/**
 *
 * Tests for Login
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { store } from 'configureStore';
import { signInWithGoogle, signInWithFacebook } from 'utils/firebase';
import { Login } from '../index';
import Loadable from '../Loadable';

jest.mock('utils/firebase', () => ({
  signInWithGoogle: jest.fn(),
  signInWithFacebook: jest.fn(),
}));

let globalStore;
const props = {
  error: false,
};
const componentWrapper = Component =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <Component {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );
describe('<Login />', () => {
  beforeAll(() => {
    globalStore = store;
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Login);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render and match the snapshot Loadable', () => {
    const {
      container: { firstChild },
    } = componentWrapper(Loadable);
    expect(firstChild).toMatchSnapshot();
  });

  it('Should be able to login with email and password', async () => {
    const { getByPlaceholderText, getByText } = componentWrapper(Loadable);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const signInButton = getByText('SIGN IN');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('should handle Google sign-in', () => {
    const { getByTestId } = componentWrapper(Loadable);

    const googleSignInButton = getByTestId('google-btn');
    fireEvent.click(googleSignInButton);

    expect(signInWithGoogle).toHaveBeenCalled();
  });

  it('should handle Facebook sign-in', () => {
    const { getByTestId } = componentWrapper(Loadable);

    const facebookSignInButton = getByTestId('facebook-btn');
    fireEvent.click(facebookSignInButton);

    expect(signInWithFacebook).toHaveBeenCalled();
  });
});
