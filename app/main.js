// import { webpackCompiler } from './dev';

import webpack from 'webpack';
import config from '../webpack.config.js';

export const webpackCompiler = webpack(config);

import middleware from 'koa-webpack';
const render = require('koa-ejs');
const path = require('path');

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const _ = require('koa-route');

const publicFiles = serve(path.join(__dirname, 'assets'));
publicFiles._name = 'static /assets';

app.use(publicFiles);

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layouts/main',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(
  _.get('/', async ctx => {
    await ctx.render('site/index');
  })
);

app.use(
  middleware({
    compiler: webpackCompiler,
    dev: {
      publicPath: config.output.publicPath,
      watchOptions: {
        aggregateTimeout: 300,
        poll: true
      }
    }
  })
);

app.listen(3000);
