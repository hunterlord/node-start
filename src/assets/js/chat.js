const { fromJS, Map, List, is } = require('immutable');

import Demo from './components/demo';

import React from 'react';
import { connect } from 'react-redux';

import { connectServer, sendMessage, setUser } from './redux/actions';
import { push } from 'react-router-redux';

import './redux/store';
const socket = require('socket.io-client');

import {
  setOnceListener,
  setListener,
  onceReceiveValue,
  receiveValue
} from './tools/listen';

class Chat extends React.Component {
  wssUrl = 'wss://localhost:3000';

  messageInput = null;

  listenSocket = null;

  state = {
    title: 'this is title'
  };

  componentDidMount() {
    this.props.connectServer({ connection: socket(this.wssUrl) });

    setOnceListener({
      name: 'socket',
      value: this.props.socket,
      callback: this.listenSocketEvent.bind(this)
    });

    setListener({
      name: 'list',
      value: this.props.list,
      callback: this.logMessage.bind(this),
      condition: this.listUpdateCondition.bind(this)
    });
  }

  listUpdateCondition(value, newValue, defaultValue) {
    console.log(
      newValue.size,
      value.size,
      List.isList(defaultValue) ? defaultValue.size : 0
    );
    return (newValue.size - value.size) % 3 === 0;
  }

  logMessage(msg) {
    console.log(` update`);
  }

  listenSocketEvent(msg) {
    console.log(`first time success`);
    msg.data.socket.on('join', user => {
      this.props.setUser(user);
    });

    msg.data.socket.on('receive chat', x => {
      this.props.sendMessage({ text: x.msg.text, nickname: x.user.nickname });
    });

    msg.data.socket.on('send success', x => {
      console.log(x);
    });
  }

  componentWillReceiveProps(nextProps) {
    onceReceiveValue({
      name: 'socket',
      newValue: nextProps.socket,
      data: nextProps
    });

    receiveValue({
      name: 'list',
      newValue: nextProps.list,
      data: nextProps
    });
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
    // this.props.push('/about');
  }

  render() {
    const input = this.props.socket !== null
      ? <div>
          <input type="text" ref={el => this.messageInput = el} />
          <input
            type="submit"
            value="send"
            onClick={this.handleSubmit.bind(this)}
          />
        </div>
      : '';

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
        <p>{this.state.title}</p>
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
    setUser: payload => dispatch(setUser(payload)),
    push: url => dispatch(push(url))
  })
)(Chat);
