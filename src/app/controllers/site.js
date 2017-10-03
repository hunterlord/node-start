const router = require('koa-router')({
  prefix: '/site'
});

router.get('/', async ctx => {
  ctx.body = 'hello site';
});

export default router;
