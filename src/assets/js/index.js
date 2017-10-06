import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './redux/store';

import Chat from './chat';

render(
  <Provider store={store}>
    <Chat />
  </Provider>,
  document.getElementById('app')
);
