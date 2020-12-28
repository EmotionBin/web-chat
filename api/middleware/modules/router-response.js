// 统一处理返回信息的中间件
const { log } = require('../../utils')
const router = require('../../route/router')

module.exports = function routerResponse (option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, code = 0) {
      const status = 1
      ctx.type = option.type || 'json'
      ctx.body = {
        status,
        msg: 'success',
        data,
        code
      }
      log({
        ctx,
        status,
        router
      })
    }
    ctx.fail = function (data, code) {
      const status = 0
      ctx.type = option.type || 'json'
      ctx.body = {
        status,
        msg: 'fail',
        data,
        code
      }
      log({
        ctx,
        status,
        router
      })
    }
    await next()
  }
}
