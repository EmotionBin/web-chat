const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
// const koaBody = require('koa-body')()
const register = require('./modules/register')

const router = new Router()

router.post('/register', register)
// router.post('/addArticle', koaBody, () => {})

module.exports = app => {
  app.use(bodyParser())
    // .use(koaBody)
    .use(router.routes())
    .use(router.allowedMethods())
}
