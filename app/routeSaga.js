import React from 'react';
import { useLocation } from 'react-router-dom';
import { LOCATION_CHANGE } from 'redux-first-history';
import { takeEvery } from 'redux-saga/effects';

function* changeLocation({ payload }) {
  console.log(
    useLocation() === state.router.location,
    useLocation(),
    state.router,
  );
  const { location, action } = payload;
  // eslint-disable-next-line
  yield console.log('LOCATION_CHANGE', location, action);
}

export default function* rootSaga() {
  yield takeEvery(LOCATION_CHANGE, changeLocation);
}
