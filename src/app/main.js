const path = require('path');

const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const serve = require('koa-static');
const https = require('https');
const fs = require('fs');

import siteRouter from './controllers/site';

app.use(
  cors({
    origin: '*'
  })
);

const publicFiles = serve(path.join(__dirname, '../dist/'));
publicFiles._name = 'static /dist';

app.use(publicFiles).use(siteRouter.routes()).use(siteRouter.allowedMethods());

// build https server
const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../ssl.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../ssl.crt'))
};

const server = https.createServer(options, app.callback());

const io = require('socket.io')(server);
io.on('connection', function(client) {
  console.log('connected.');
  client.emit('hello', 'world');
  client.on('event', function(data) {});
  client.on('disconnect', function() {
    console.log(`disconnect!`);
  });
});

server.listen(3000);
