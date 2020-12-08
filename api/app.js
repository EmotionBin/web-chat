const Koa = require('koa')
const route = require('./route')
const socket = require('./socket')
const staticFile = require('./utils/modules/static-files')

const app = new Koa()

route(app)

staticFile(app)

const port = process.env.PORT || 3808

const serve = app.listen(port, () => console.log(`serve is running on ${port}`))

// 建立 socket 连接
socket(serve)
