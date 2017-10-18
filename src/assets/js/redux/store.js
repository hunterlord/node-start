import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

const history = createHistory();

const historyMiddleware = routerMiddleware(history);

const store = createStore(
  reducers,
  applyMiddleware(...[logger, ReduxThunk, historyMiddleware])
);

export { store, history };
