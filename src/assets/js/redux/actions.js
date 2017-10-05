import * as TYPES from './types';

const createAction = (type, payload, subtypeName) => {
  type = subtypeName ? type[subtypeName] : type;
  return { type, payload };
};

// 获取文章详细
export function fetchPost() {
  return dispatch => {
    dispatch(createAction(TYPES.POSTS.STATUS, null, 'REQUEST'));
    new Promise((resolve, reject) => resolve('test'))
      .then(x => dispatch(createAction(TYPES.POSTS.STATUS, x, 'SUCCESS')))
      .catch(x => dispatch(createAction(TYPES.POSTS.STATUS, x, 'FAILURE')));
  };
}

export function fetchRecentPost() {
  return dispatch => {
    dispatch(createAction(TYPES.RECENT_POSTS.STATUS, null, 'REQUEST'));
    new Promise((resolve, reject) => resolve({ id: 1, title: 'first blood' }))
      .then(x =>
        dispatch(createAction(TYPES.RECENT_POSTS.STATUS, x, 'SUCCESS'))
      )
      .catch(x =>
        dispatch(createAction(TYPES.RECENT_POSTS.STATUS, x, 'FAILURE'))
      );
  };
}

export function fetchTest() {
  return dispatch => {
    dispatch(fetchPost());
    dispatch(fetchRecentPost());
  };
}
