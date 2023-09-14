import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { store } from 'configureStore';
import LocaleToggle, { mapDispatchToProps } from '../index';
import LanguageProvider from '../../LanguageProvider';
import { translationMessages } from '../../../i18n';
import { changeLocale } from '../../LanguageProvider/slice';

// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
describe('<LocaleToggle />', () => {
  let globalStore;

  beforeAll(() => {
    globalStore = store;
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={globalStore}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should present the default `en` english language option', () => {
    const { container } = render(
      <Provider store={globalStore}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    expect(container.querySelector('option[value="en"]')).not.toBeNull();
  });
});

describe('onLocaleToggle', () => {
  it('should be injected', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    expect(result.onLocaleToggle).toBeDefined();
  });

  it('should dispatch changeLocale when called', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const locale = 'de';
    const evt = { target: { value: locale } };
    result.onLocaleToggle(evt);
    expect(dispatch).toHaveBeenCalledWith(changeLocale(locale));
  });
});
