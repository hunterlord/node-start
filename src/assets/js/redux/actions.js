import * as TYPES from './types';

const createAction = (type, payload = null, subtypeName) => {
  type = subtypeName ? type[subtypeName] : type;
  return payload => ({
    type,
    payload
  });
};

export const connectServer = createAction(TYPES.CHAT.CONNECT);

export const sendMessage = createAction(TYPES.CHAT.SEND_CHAT);
