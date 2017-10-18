import 'babel-polyfill';
import React from 'react';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <h3>{this.props.other}</h3>
        hello demo
      </div>
    );
  }
}

const bird = (params = {}) => Component => {
  return class BirdMan extends React.Component {
    // constructor(props) {
    //   super(props);
    // }

    render() {
      const props = Object.assign({}, this.props, params);

      const proxyProps = new Proxy(props, {
        get: (target, key, receiver) => {
          console.log(`key`, key);
          switch (key) {
            case 'title':
              return 'title is proxy';
            default:
              return 'proxy default message';
          }
        },
        set: (target, key, value, receiver) => {
          return Reflect.set(target, key, value, receiver);
        }
      });

      return <Component {...proxyProps} />;
    }
  };
};

export default bird({ title: 'eeee..', other: null })(Demo);
