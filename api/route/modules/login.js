// 登录接口

const { databaseQuery, tokenCreate } = require('../../utils/index')

module.exports = async ctx => {
  let { username, password } = ctx.request.body
  username = username.trim()
  try {
    const userInfo = await databaseQuery(`select * from user where username = '${username}'`)
    if (!userInfo.length) {
      // 没有匹配的用户名 用户名不存在
      ctx.fail('', 5007)
      return
    }
    const userData = userInfo[0]
    // 用户名存在 匹配密码
    if (password !== userData.password) {
      ctx.fail('', 5008)
      return
    }
    // 生成 token
    const { userId } = userData
    const payload = {
      username
    }
    // token 过期时间默认一个小时
    const options = {
      expiresIn: 60 * 60
    }
    // token 作映射 活跃用户自动延长 token 时间 要做单点登录 ！！！！！！！！！！！！！！！！！！！！！！
    /**
     * 具体实现 服务端的 userId 不会暴露给前端 所以 userId 会作为 token 的秘钥
     * 登录成功后 生成一个 hash 字符串 s-s-s-s 格式 同时生成 token 做好 hash 字符串与 token 的映射 存储到数据库中
     * 映射关系一共三个字段 username、s-s-s-s、token 需要做限制只能在一个地方登录
     */
    const uuid = await tokenCreate(payload, userId, options, username)
    ctx.success(uuid)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}
