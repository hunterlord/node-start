const render = require('koa-ejs');
const path = require('path');

const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const serve = require('koa-static');
const _ = require('koa-route');

// import * from './controllers/test';
const a = require('./controllers/test');

app.use(
  cors({
    origin: '*'
  })
);

const publicFiles = serve(path.join(__dirname, '../dist/'));
publicFiles._name = 'static /dist';

app.use(publicFiles);

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layouts/main',
  viewExt: 'html',
  cache: false,
  debug: false
});

app.use(
  _.get('/', async ctx => {
    ctx.body = 'hello world 2322' + a.a;
  })
);

app.listen(3000);
