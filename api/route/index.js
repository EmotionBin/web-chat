const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
// const koaBody = require('koa-body')()
const register = require('./modules/register')
const login = require('./modules/login')
const { routerResponse, tokenAutoRefresh } = require('../middleware/index')

const router = new Router()

router.post('/register', register)
router.post('/login', login)
// router.post('/addArticle', koaBody, () => {})

module.exports = app => {
  app.use(bodyParser())
    // .use(koaBody)
    .use(tokenAutoRefresh())
    .use(routerResponse())
    .use(router.routes())
    .use(router.allowedMethods())
}
