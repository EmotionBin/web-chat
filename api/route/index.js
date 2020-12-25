const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const { routerResponse, tokenCheck } = require('../middleware')
const route = require('./router')

const router = new Router()

// 循环挂载路由
route.forEach(({ type, path, callback }) => {
  const f = router[type]
  f.call(router, path, callback)
})

module.exports = app => {
  app.use(bodyParser())
    .use(routerResponse())
    .use(tokenCheck)
    .use(router.routes())
    .use(router.allowedMethods())
}
