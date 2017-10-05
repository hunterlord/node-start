import { combineReducers } from 'redux';
import * as TYPES from './types';
import { Map, fromJS } from 'immutable';

const posts = (
  state = fromJS({
    isFetch: false,
    detail: {},
    recentList: { isFetch: false, entries: {} }
  }),
  action
) => {
  switch (action.type) {
    case TYPES.POSTS.STATUS.REQUEST:
      return state.set('isFetch', true);
    case TYPES.POSTS.STATUS.FAILURE:
      return state.set('isFecth', false).set('errmsg', action.payload);
    case TYPES.POSTS.STATUS.SUCCESS:
      return state.set('isFetch', false).set('detail', action.payload);
    case TYPES.RECENT_POSTS.STATUS.REQUEST:
      return state.setIn(['recentList', 'isFetch'], true);
    case TYPES.RECENT_POSTS.STATUS.FAILURE:
      return state
        .setIn(['recentList', 'isFetch'], false)
        .setIn(['recentList', 'errmsg'], action.payload);
    case TYPES.RECENT_POSTS.STATUS.SUCCESS:
      return state
        .setIn(['recentList', 'isFetch'], false)
        .updateIn(['recentList', 'entries'], entries =>
          entries.set(action.payload.id, action.payload.title)
        );
    default:
      return state;
  }
};

export default combineReducers({
  posts
});
