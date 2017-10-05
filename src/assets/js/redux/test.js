import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

import { fetchPost, fetchTest } from './actions';

export const store = createStore(
  reducers,
  applyMiddleware(...[logger, ReduxThunk])
);

// store.dispatch(fetchPost());
store.dispatch(fetchTest());
