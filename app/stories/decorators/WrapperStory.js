import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import configureStore from '../../configureStore';

// Create redux store with history
const initialState = {};
const { store, history } = configureStore(initialState);

function WrapperStory(props) {
  return (
    <Provider store={store}>
      <IntlProvider locale="en">
        <Router history={history}>{props.children}</Router>
      </IntlProvider>
    </Provider>
  );
}

export default WrapperStory;

WrapperStory.propTypes = {
  children: PropTypes.element,
};
