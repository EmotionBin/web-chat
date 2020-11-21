// 统一处理返回信息的中间件

module.exports = function routerResponse (option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, code = 0) {
      ctx.type = option.type || 'json'
      ctx.body = {
        status: 1,
        msg: 'success',
        data,
        code
      }
    }
    ctx.fail = function (data, code) {
      ctx.type = option.type || 'json'
      ctx.body = {
        status: 0,
        msg: 'fail',
        data,
        code
      }
    }
    await next()
  }
}
