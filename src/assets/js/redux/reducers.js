import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as TYPES from './types';
import { Map, List } from 'immutable';

let id = 0;

const chat = (
  state = Map({
    connection: null,
    nickname: null,
    users: Map({
      byId: Map(),
      userIds: List()
    }),
    chats: Map({
      list: List()
    })
  }),
  action
) => {
  switch (action.type) {
    case TYPES.CHAT.CONNECT:
      return state.set('connection', action.payload.connection);
    case TYPES.CHAT.SET_USER:
      return state.set('nickname', action.payload.nickname);
    case TYPES.CHAT.SEND_CHAT:
    case TYPES.CHAT.RECIEVE_CHAT:
      return state.updateIn(['chats', 'list'], list =>
        list.push({
          id: list.size,
          text: action.payload.text,
          nickname: action.payload.nickname,
          checked: action.type === TYPES.CHAT.SEND_CHAT ? false : true
        })
      );
    case TYPES.CHAT.ADD_USER:
      return state.updateIn(['users', 'byId'], byId =>
        byId.set(action.payload.id, action.payload)
      );
    case TYPES.CHAT.REMOVE_USER:
      return;
    default:
      return state;
  }
};

export default combineReducers({
  chat,
  router: routerReducer
});
