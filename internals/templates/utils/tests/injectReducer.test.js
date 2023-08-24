/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import configureStore from '../../configureStore';
import { useInjectReducer } from '../injectReducer';
import * as reducerInjectors from '../reducerInjectors';

const reducer = s => s;

describe('useInjectReducer hook', () => {
  let globalStore;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    injectors = {
      injectReducer: jest.fn(),
    };
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
    const { store } = configureStore({}, memoryHistory);
    globalStore = store;
    ComponentWithReducer = () => {
      useInjectReducer({ key: 'test', reducer });
      return null;
    };
  });

  it('should inject a given reducer', () => {
    render(
      <Provider store={globalStore}>
        <ComponentWithReducer />
      </Provider>,
    );

    expect(injectors.injectReducer).toHaveBeenCalledTimes(1);
  });
});
