const webpack = require('webpack');
const mode = process.env.NODE_ENV;
const IS_PROD = mode === 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

console.log('MODE', mode);

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
  new CleanWebpackPlugin(['src/dist'], {
    root: __dirname,
    verbose: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'commons.[hash].js',
    chunks: ['index']
  }),
  new webpack.ProvidePlugin({
    'window.jQuery': 'jquery'
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new HtmlWebpackPlugin({
    title: 'hunter webpack start demo',
    filename: 'index.html',
    template: path.join(__dirname, 'src/assets/views/index.ejs'),
    chunks: ['commons', 'index']
  })
];

let css_loader_use = css_loader_dev;

if (IS_PROD) {
  plugins = [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode || 'development')
    }),
    new ExtractTextPlugin('styles.css'),
    new MinifyPlugin()
  ];
  css_loader_use = css_loader_prod;
} else {
  plugins = [...plugins, new webpack.HotModuleReplacementPlugin()];
}

module.exports = {
  context: path.resolve(__dirname, 'src/assets'),
  entry: {
    index: './js/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'src/dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src/assets'),
    compress: true,
    https: true,
    hot: true,
    disableHostCheck: true
  },
  devtool: IS_PROD ? false : 'inline-source-map',
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
            babelrc: false,
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
      styles: path.resolve(__dirname, 'src/assets/css')
    }
  },
  plugins: plugins
};
