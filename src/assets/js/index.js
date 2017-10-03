import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

const Demo = <div>Simple Components</div>;
const App = () => <div className="big"> Hello world , {Demo}</div>;

ReactDOM.render(<App />, document.getElementById('app'));
