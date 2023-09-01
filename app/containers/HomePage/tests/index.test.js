/**
 * Test the HomePage
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { store } from 'configureStore';
import { HomePage } from '../index';

describe('<HomePage />', () => {
  let globalStore;

  beforeAll(() => {
    globalStore = store;
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage loading={false} error={false} repos={[]} />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should fetch the repos on mount if a username exists', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage
            username="Not Empty"
            onChangeUsername={() => {}}
            onSubmitForm={submitSpy}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call onSubmitForm if username is an empty string', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage onChangeUsername={() => {}} onSubmitForm={submitSpy} />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should not call onSubmitForm if username is null', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={globalStore}>
        <IntlProvider locale="en">
          <HomePage
            username=""
            onChangeUsername={() => {}}
            onSubmitForm={submitSpy}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });
});
