import * as ACTIONS from './types';

function fetchPostRequest() {
  return { type: ACTIONS.POSTS.STATUS.REQUEST };
}

function fetchPostFailed(payload) {
  return { type: ACTIONS.POSTS.STATUS.FAILURE, payload };
}

function fetchPostSuccess(payload) {
  return { type: ACTIONS.POSTS.STATUS.SUCCESS, payload };
}

export function fetchPost() {
  return dispatch => {
    dispatch(fetchPostRequest());
    new Promise((resolve, reject) => resolve('test'))
      .then(x => dispatch(fetchPostSuccess(x)))
      .catch(x => dispatch(fetchPostFailed(x)));
  };
}
