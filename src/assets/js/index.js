const { Map, fromJS } = require('immutable');

let states = fromJS({
  byId: {},
  allIds: [],
  posts: {
    count: 1,
    list: [
      {
        author: 'fox'
      }
    ]
  }
});

let s2 = states.updateIn(['posts', 'list'], x =>
  x.push(Map({ author: 'wolf' }))
);

console.log(states === s2);
console.log(states.get('byId') === states.get('byId'));

//curd
