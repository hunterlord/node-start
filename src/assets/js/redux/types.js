const makeStatus = x => ({
  REQUEST: `${x} fetch request`,
  FAILURE: `${x} fetch failure`,
  SUCCESS: `${x} fetch success`
});

const POSTS = {
  DETAIL: 'posts detail',
  STATUS: makeStatus('posts')
};

const RECENT_POSTS = {
  LIST: 'recent posts list',
  STATUS: makeStatus('recent posts')
};

export { POSTS, RECENT_POSTS };
