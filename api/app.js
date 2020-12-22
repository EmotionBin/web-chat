const Koa = require('koa')
const route = require('./route')
const socket = require('./socket')
const staticFile = require('./utils/modules/static-files')
const sslify = require('koa-sslify').default
const fs = require('fs')
const https = require('https')

const options = {
  key: fs.readFileSync('./ssl/2_huangweibinupup.cn.key'),
  cert: fs.readFileSync('./ssl/1_huangweibinupup.cn_bundle.crt')
}

const app = new Koa()

app.use(sslify())

route(app)

staticFile(app)

const port = process.env.PORT || 3808

// const serve = app.listen(port, () => console.log(`serve is running on ${port}`))

const serve = https.createServer(options, app.callback()).listen(port, () => console.log(`serve is running on ${port}`))

// 建立 socket 连接
socket(serve)
