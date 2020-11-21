module.exports = function tokenAutoRefresh(option = {}) {
  return async function (ctx, next) {
    const { url } = ctx.request
    ignoreList = [
      '/register',
      '/login'
    ]
    if (ignoreList.indexOf(url) < 0) console.log('刷新 token ')
    await next()
  }
}
