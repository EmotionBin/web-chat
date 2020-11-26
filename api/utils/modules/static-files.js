// 开放静态资源

const path = require('path')
const koaStatic = require('koa-static')

module.exports = function (app) {
  const staticPath = '../../images'
  app.use(koaStatic(path.join(__dirname, staticPath)))
}
