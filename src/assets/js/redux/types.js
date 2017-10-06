const makeStatus = x => ({
  REQUEST: `${x} fetch request`,
  FAILURE: `${x} fetch failure`,
  SUCCESS: `${x} fetch success`
});

const CHAT = {
  CONNECT: 'CONNETC CHAT SERVER',
  ADD_USER: 'CHAT ADD USER',
  REMOVE_USER: 'CHAT REMOVE USER',
  SEND_CHAT: 'CHAT SEND CHAT',
  RECIEVE_CHAT: 'CHAT RECIEVE CHAT'
};

export { CHAT };
