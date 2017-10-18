import { Map } from 'immutable';
const EventEmitter = require('events');
// 存储监听
let store = Map();

// 设置监听默认对象
const defaultSetParams = Map({
  name: null,
  value: null,
  originValue: null,
  callback: () => {},
  multi: false,
  or: false,
  condition: null
});

// 设置接受默认对象
const defaultReceiveParams = Map({
  name: null,
  newValue: null,
  data: {}
});

// 设置一次性监听
export const setOnceListener = (params = defaultSetParams.toJS()) => {
  const { name, value, callback } = params;
  const $name = `${name} once`;
  const event = new EventEmitter();
  event.once('change', d => {
    callback(d);
    store.delete($name);
  });

  store = store.set($name, { event, ...params });
};

// 设置持续监听
export const setListener = params => {
  const { name, value, callback } = params;
  const event = new EventEmitter();
  event.on('change', d => callback(d));
  store = store.set(name, { event, ...params });
};

const hasChanged = (params, once = false) => {
  const { name, newValue, data } = params;
  const $name = once ? `${name} once` : name;
  if (!store.has($name)) return;
  const {
    value,
    callback,
    event,
    multi,
    or,
    condition,
    originValue
  } = store.get($name);

  let changed = false;

  if (typeof condition === 'function') {
    changed = condition(value, newValue, originValue);
  } else if (multi) {
    let cd = 0;
    value.map((x, i) => {
      let xcd = x === newValue[i] ? 0 : 1;
      cd += xcd;
    });
    changed = !or ? cd === value.length : cd > 0;
  } else if (value !== newValue) {
    changed = true;
  }

  if (!once) {
    store = store.update($name, x => {
      if (!x.originValue) {
        x.originValue = x.value;
      }
      x.value = newValue;
      return x;
    });
  }

  if (changed) {
    event.emit('change', { value, data });
  }
};

// 接收一次性监听的对象
export const onceReceiveValue = (params = defaultReceiveParams.toJS()) => {
  hasChanged(params, true);
};

// 接收持续监听的对象
export const receiveValue = (params = defaultReceiveParams.toJS()) => {
  hasChanged(params);
};
