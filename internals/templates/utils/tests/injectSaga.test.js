/**
 * Test injectors
 */

import { put } from 'redux-saga/effects';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../configureStore';
import { useInjectSaga } from '../injectSaga';
import * as sagaInjectors from '../sagaInjectors';

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('useInjectSaga hook', () => {
  let globalStore;
  let injectors;
  let ComponentWithSaga;

  beforeAll(() => {
    // eslint-disable-next-line no-import-assign
    sagaInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    const { store } = configureStore({});
    globalStore = store;
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    // eslint-disable-next-line react/function-component-definition
    ComponentWithSaga = () => {
      useInjectSaga({
        key: 'test',
        saga: testSaga,
        mode: 'testMode',
      });
      return null;
    };
    sagaInjectors.default.mockClear();
  });

  it('should inject given saga and mode', () => {
    const props = { test: 'test' };
    render(
      <Provider store={globalStore}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );

    expect(injectors.injectSaga).toHaveBeenCalledTimes(1);
  });

  it('should eject on unmount with a correct saga key', () => {
    const props = { test: 'test' };
    const { unmount } = render(
      <Provider store={globalStore}>
        <ComponentWithSaga {...props} />
      </Provider>,
    );
    unmount();

    expect(injectors.ejectSaga).toHaveBeenCalledTimes(1);
  });
});
