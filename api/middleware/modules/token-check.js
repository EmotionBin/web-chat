// token 校验

const jwt = require('jsonwebtoken')
const { ignoreList } = require('../../data')
const router = require('../../route/router')
const { databaseQuery, tokenRefresh } = require('../../utils/index')

module.exports = async (ctx, next) => {
  const { path } = ctx.request
  console.log('path: ', path)
  const isIgnore = ignoreList.some(item => path.includes(item))
  // 忽略不需要检测 token 的 path
  if (isIgnore) {
    await next()
  } else {
    const { auth } = router.find(item => item.path === path)
    if (!auth) {
      await next()
    } else {
      const { uuid } = ctx.request.headers
      // 查询 每个用户的信息
      const userData = await databaseQuery(`select * from token where uuid='${uuid}'`)
      if (!userData.length) {
        ctx.fail('', 4001)
        return
      }
      const { username, token, userId } = userData[0]
      await jwt.verify(token, userId, async (err, decoded) => {
        if (err) {
          // token 验证失败 删除记录的信息
          console.log(err, 'token验证失败')
          ctx.fail('', 4001)
          await databaseQuery(`delete from token where userId='${userId}'`)
          return
        }
        // 如果 token 还有十分钟过期 刷新token
        if ((decoded.exp - Math.floor(+new Date() / 1000)) <= 10 * 60) {
          const payload = {
            username
          }
          // token 过期时间默认一个小时
          const options = {
            expiresIn: 60 * 60
          }
          console.log('刷新token')
          await tokenRefresh(payload, userId, options, username)
        }
        await next()
      })
    }
  }
}
