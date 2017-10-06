import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

export const store = createStore(
  reducers,
  applyMiddleware(...[logger, ReduxThunk])
);

export default store;
