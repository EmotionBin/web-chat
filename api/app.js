const Koa = require('koa')
const route = require('./route')
const socket = require('./socket')
const staticFile = require('./utils/modules/static-files')

const app = new Koa()

socket(app)

route(app)

staticFile(app)

const port = process.env.PORT || 3808

app.listen(port, () => console.log(`serve is running on ${port}`))
