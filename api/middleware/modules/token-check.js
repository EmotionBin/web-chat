// token 校验

const jwt = require('jsonwebtoken')
const { ignoreList } = require('../../data')
const { databaseQuery, tokenCreate } = require('../../utils/index')

module.exports = async (ctx, next) => {
  const { url } = ctx.request
  // 忽略不需要检测 token 的 url
  if (ignoreList.indexOf(url) > -1) {
    await next()
  } else {
    const { uuid } = ctx.request.headers
    // 查询 每个用户的 id
    const { username, token, userId } = await databaseQuery(`select * from token where uuid='${uuid}'`)

    jwt.verify(token, userId, async (err, decoded) => {
      if (err) {
        // token 验证失败 删除记录的信息
        console.log(err, 'token验证失败')
        await databaseQuery(`delete from token where userId='${userId}'`)
        ctx.body = {
          status: 0,
          msg: 'fail',
          data: '',
          code: 4001
        }
        return
      }
      // token 校验成功
      console.log('校验成功', decoded.exp)
      const payload = {
        username
      }
      // token 过期时间默认一个小时
      const options = {
        expiresIn: 60 * 60
      }
      tokenCreate(payload, userId, options, username)
      await next()
    })
  }
}
