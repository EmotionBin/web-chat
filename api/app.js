const Koa = require('koa')
const route = require('./route')
const staticFile = require('./utils/modules/static-files')

const app = new Koa()

route(app)

staticFile(app)

const port = process.env.PORT || 3808

app.listen(port, () => console.log(`serve is running on ${port}`))
