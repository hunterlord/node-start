import { combineReducers } from 'redux';
import * as ACTIONS from './types';
import { Map } from 'immutable';

const posts = (state = Map({ isFetch: false, detail: {} }), action) => {
  switch (action.type) {
    case ACTIONS.POSTS.REQUEST:
      return state.set('isFetch', true);
    case ACTIONS.POSTS.FAILURE:
      return state.set('isFecth', false).set('errmsg', action.payload);
    case ACTIONS.POSTS.SUCCESS:
      return state.set('isFetch', false).set('detail', action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  posts
});
