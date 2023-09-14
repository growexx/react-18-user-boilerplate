import React from 'react';

import { render } from '@testing-library/react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';

import { store } from 'configureStore';
import ConnectedLanguageProvider, { LanguageProvider } from '../index';

import { translationMessages } from '../../../i18n';

// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>,
    );
    expect(container.firstChild).not.toBeNull();
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let globalState;

  beforeAll(() => {
    globalState = store;
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={globalState}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>,
    );
    expect(queryByText(messages.someMessage.defaultMessage)).not.toBeNull();
  });
});
