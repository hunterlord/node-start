const webpack = require('webpack');
const mode = process.env.NODE_ENV;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const css_loader_dev = [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader'
  },
  {
    loader: 'postcss-loader'
  }
];

const less_loader_use = [
  {
    loader: 'style-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true
    }
  }
];

const css_loader_prod = ExtractTextPlugin.extract([
  'css-loader',
  'postcss-loader'
]);

const import_options = [];

let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    // filename: '[name].[hash].js',
    filename: '[name].js',
    chunks: ['main']
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ProvidePlugin({
    'window.jQuery': 'jquery'
  }),
  new webpack.optimize.ModuleConcatenationPlugin()
];

let css_loader_use = css_loader_dev;

const hotLink =
  'webpack-hot-middleware/client?timeout=2000&overlay=false&reload=1';

if (mode === 'PROD') {
  plugins = [...plugins, new ExtractTextPlugin('styles.css')];
  css_loader_use = css_loader_prod;
}

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    site: [
      // 'webpack-hot-middleware/client?reload=1',
      hotLink,
      path.resolve(__dirname, 'app/assets/js/site/index.js')
    ]
  },
  output: {
    // filename: '[name].[hash].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'app/assets'),
    // compress: true,
    //外网访问
    disableHostCheck: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: css_loader_use
      },
      {
        test: /\.less$/,
        use: less_loader_use
      },
      {
        test: /\.html/,
        loader: 'art-template-loader'
      },
      {
        test: /\.(ttf|svg|woff2|otf|eot|woff|gif|png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              'transform-runtime',
              'transform-class-properties',
              ['import', import_options]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'app/assets/css')
    }
  },
  plugins: plugins
};
