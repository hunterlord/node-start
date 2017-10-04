const { fromJS, Map, List } = require('immutable');
import React from 'react';
import ReactDOM from 'react-dom';
import './redux/test';

const Demo = <div> Simple Components </div>;

class App extends React.Component {
  state = {
    count: fromJS({
      times: 0,
      posts: 0
    }),
    list: List([]),
    form: fromJS({
      title: ''
    })
  };

  addCount() {
    this.setState((prevState, props) => ({
      count: prevState.count.update('posts', x => x + 1)
    }));

    console.log('current state is :', this.state);
  }

  addList(event) {
    this.setState((prevState, props) => ({
      list: prevState.list.push(
        Map({ title: prevState.form.get('title'), id: prevState.list.size })
      ),
      form: prevState.form.set('title', '')
    }));

    this.listWrapper.style.color = 'green';

    console.log(this.birdRef);

    this.birdRef.setTitle('Updated by parent Component.');

    event.preventDefault();
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState((prevState, props) => ({
      form: prevState.form.update('title', x => value)
    }));
  }

  render() {
    const lists = this.state.list.map(x => (
      <p key={x.get('id')}>{x.get('title')}</p>
    ));

    return (
      <div className="big">
        <div ref={x => this.listWrapper = x}>
          {lists}
        </div>
        <div>
          <input
            type="text"
            value={this.state.form.get('title')}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="submit"
            value="Submit"
            onClick={this.addList.bind(this)}
          />
        </div>
        <button onClick={this.addCount.bind(this)}> Add Count </button>
        Hello world,
        {Demo}
        <br />
        <Bird
          ref={x => this.birdRef = x}
          count={this.state.count.get('times')}
        />
      </div>
    );
  }
}

class Bird extends React.Component {
  state = { title: 'bird' };

  componentWillUpdate() {
    console.log('component updated.');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.count !== this.props.count || this.state !== nextState;
  }

  setTitle(title) {
    console.log(`ready to update title.`);
    this.setState({
      title
    });
  }

  render() {
    return <div> this is {this.state.title}, {this.props.count} </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
