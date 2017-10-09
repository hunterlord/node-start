const { fromJS, Map, List, is } = require('immutable');

import React from 'react';
import { connect } from 'react-redux';

import { connectServer, sendMessage, setUser } from './redux/actions';

import './redux/store';
const socket = require('socket.io-client');

class Chat extends React.Component {
  wssUrl = 'wss://localhost:3000';

  messageInput = null;

  componentDidMount() {
    this.props.connectServer({ connection: socket(this.wssUrl) });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.socket === null && nextProps.socket) {
      console.log('will');

      nextProps.socket.on('join', user => {
        this.props.setUser(user);
      });

      nextProps.socket.on('receive chat', x => {
        this.props.sendMessage({ text: x.msg.text, nickname: x.user.nickname });
      });

      nextProps.socket.on('send success', x => {
        console.log(x);
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.socket !== this.props.socket ||
      nextProps.list.size !== this.props.list.size
    );
  }

  handleSubmit() {
    const msg = {
      text: this.messageInput.value,
      nickname: this.props.nickname
    };
    this.props.sendMessage(msg);

    msg.id = this.props.list.size;
    this.props.socket.emit('send chat', msg);
    this.messageInput.value = '';
  }

  render() {
    const input =
      this.props.socket !== null ? (
        <div>
          <input type="text" ref={el => (this.messageInput = el)} />
          <input
            type="submit"
            value="send"
            onClick={this.handleSubmit.bind(this)}
          />
        </div>
      ) : (
        ''
      );

    const chatList = this.props.list.map(x => {
      return (
        <li key={x.id}>
          {x.nickname}: <br />
          {x.text}
        </li>
      );
    });

    return (
      <div>
        {input}
        <ul>{chatList}</ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    socket: state.chat.get('connection'),
    list: state.chat.getIn(['chats', 'list']),
    nickname: state.chat.get('nickname')
  }),
  dispatch => ({
    connectServer: payload => dispatch(connectServer(payload)),
    sendMessage: payload => dispatch(sendMessage(payload)),
    setUser: payload => dispatch(setUser(payload))
  })
)(Chat);
