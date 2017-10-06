const { fromJS, Map, List } = require('immutable');

import React from 'react';
import { connect } from 'react-redux';

import { connectServer } from './redux/actions';

import './redux/store';

class Chat extends React.Component {
  componentDidMount() {
    this.props.connectServer();
  }

  componentWillReceiveProps() {}

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.socket !== this.props.socket ||
      nextProps.list.is(this.props.list)
    );
  }

  render() {
    const input = this.props.socket !== null
      ? <div>
          <input type="text" />
          <input type="submit" value="send" />
        </div>
      : '';

    return (
      <div>
        {input}
        <ul>
          <li>lalala </li>
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    socket: state.chat.get('connection'),
    list: state.chat.getIn(['chats', 'list'])
  }),
  dispatch => ({
    connectServer: () =>
      dispatch(connectServer({ url: 'wss://localhost:3000' }))
  })
)(Chat);
