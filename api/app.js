const Koa = require('koa')
const route = require('./route')

const app = new Koa()

route(app)

const port = process.env.PORT || 3808

app.listen(port, () => console.log(`serve is running on ${port}`))
