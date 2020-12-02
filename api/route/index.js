const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
// const koaBody = require('koa-body')()
const register = require('./modules/register')
const login = require('./modules/login')
const getLocation = require('./modules/location')
const getWeather = require('./modules/weather')
const getUser = require('./modules/user')
const getRoom = require('./modules/room')
const { routerResponse, tokenCheck } = require('../middleware')

const router = new Router()

router.post('/register', register)
router.post('/login', login)
router.get('/getLocation', getLocation)
router.get('/getWeather', getWeather)
router.get('/getUser', getUser)
router.get('/getRoom', getRoom)
// router.post('/addArticle', koaBody, () => {})

module.exports = app => {
  app.use(bodyParser())
    // .use(koaBody)
    .use(routerResponse())
    .use(tokenCheck)
    .use(router.routes())
    .use(router.allowedMethods())
}
