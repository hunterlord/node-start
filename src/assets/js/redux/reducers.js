import {
  combineReducers
} from 'redux';
import * as TYPES from './types';
import {
  Map,
  List
} from 'immutable';
const socket = require('socket.io-client');

const chat = (
  state = Map({
    connection: null,
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
      return state.set('connection', socket(action.payload.url));
    case TYPES.CHAT.SEND_CHAT:
    case TYPES.CHAT.RECIEVE_CHAT:
      return state.updateIn(['chats', 'list'], list =>
        list.push(action.payload)
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
  chat
});
