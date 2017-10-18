import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { store, history } from './redux/store';

import Chat from './chat';
import { Page } from './components/page';

import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Chat} />
        <Route path="/about" component={Page} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
