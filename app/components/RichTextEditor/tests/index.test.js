/**
 *
 * Tests for RichTextEditor
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { EditorState } from 'draft-js';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import history from 'utils/history';
import { store } from 'configureStore';
import RichTextEditor from '../index';

// if not using firebase messaging remove this mock
jest.mock('firebase/messaging', () => {
  const actualModule = jest.requireActual('firebase/messaging');
  return {
    ...actualModule,
    onMessage: jest.fn(),
    getMessaging: jest.fn(),
  };
});
jest.mock('draft-js/lib/generateRandomKey', () => () => '123');
let globalStore;
const props = {
  value: EditorState.createEmpty(),
  onChange: jest.fn(),
};

const componentWrapper = () =>
  render(
    <Provider store={globalStore}>
      <IntlProvider locale="en">
        <Router history={history}>
          <RichTextEditor {...props} />
        </Router>
      </IntlProvider>
    </Provider>,
  );

describe('<RichTextEditor />', () => {
  beforeAll(() => {
    globalStore = store;
  });
  it('Should render and match the snapshot', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
