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
import RichTextEditor from '../index';
import configureStore from '../../../configureStore';
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
    const { store } = configureStore({});
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
