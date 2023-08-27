import React from 'react';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */

const useInjectReducer = ({ key, reducer }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };
