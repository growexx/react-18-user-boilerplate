/**
 *
 * Tests for RichTextEditor
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { EditorState } from 'draft-js';
import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from 'react-router-dom';
import history from 'utils/history';
import RichTextEditor from '../index';
import configureStore from '../../../configureStore';
jest.mock('draft-js/lib/generateRandomKey', () => () => '123');
let store;
const props = {
  value: EditorState.createEmpty(),
  onChange: jest.fn(),
};

const componentWrapper = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <RichTextEditor {...props} />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );

describe('<RichTextEditor />', () => {
  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });
  it('Should render and match the snapshot', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    const {
      container: { firstChild },
    } = componentWrapper();
    expect(firstChild).toMatchSnapshot();
  });
});
