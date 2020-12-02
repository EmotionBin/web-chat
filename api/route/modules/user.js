// 获取用户信息接口

const { databaseQuery } = require('../../utils/index')

module.exports = async ctx => {
  try {
    const { userId } = ctx.request.query
    const userInfo = await databaseQuery(`select * from user where userId = '${userId}'`)
    if (!userInfo.length) {
      // 没有匹配的用户名 用户名不存在
      ctx.fail('', 5007)
      return
    }
    const { username, avatar } = userInfo[0]
    ctx.success({
      username,
      userId,
      avatar
    })
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}
