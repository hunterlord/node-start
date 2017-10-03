const path = require('path');

const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const serve = require('koa-static');

import siteRouter from './controllers/site';

app.use(
  cors({
    origin: '*'
  })
);

const publicFiles = serve(path.join(__dirname, '../dist/'));
publicFiles._name = 'static /dist';

app.use(publicFiles).use(siteRouter.routes()).use(siteRouter.allowedMethods());

app.listen(3000);
