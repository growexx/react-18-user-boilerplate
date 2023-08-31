import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import LocaleToggle from '../index';
import LanguageProvider from '../../LanguageProvider';
import configureStore from '../../../configureStore';
import { translationMessages } from '../../../i18n';

describe('<LocaleToggle />', () => {
  let globalStore;

  beforeAll(() => {
    const { store } = configureStore({});
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
