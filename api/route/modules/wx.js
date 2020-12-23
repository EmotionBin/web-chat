// 用于实现微信登录
const { uniqueString, databaseQuery, tokenCreate } = require('../../utils')

// 记录用于校验微信登录的唯一 code 值
const CODE_MAP = {}

// 生成唯一字符串 用于验证微信小程序的登录
const getCode = async ctx => {
  const { socketId } = ctx.query
  console.log('socketId: ', socketId)
  try {
    const code = uniqueString()
    console.log('code: ', code)
    CODE_MAP[socketId] = code
    ctx.success({
      code
    })
  } catch (error) {
    console.log(error)
    ctx.fail('', 5000)
  }
}

// 小程序登录
const wxLogin = async ctx => {
  const { user, code } = ctx.request.body
  const { username, avatar } = user
  try {
    const socketId = Object.keys(CODE_MAP).find(item => CODE_MAP[item] === code)
    console.log('socketId: ', socketId)
    if (!socketId) {
      console.log('code: ', code)
      console.log('登录失败, code校验不通过')
      ctx.fail('', 5009)
      return
    }
    const userInfo = await databaseQuery(`select * from user where username = '${username}'`)
    if (!userInfo.length) {
      // 该用户未注册过 直接写入
      await databaseQuery(`insert into user values ('${username}','${code}','${code}','${avatar}')`)
    }
    const userId = userInfo.length ? userInfo[0].userId : code
    // 准备生成 token
    const payload = {
      username
    }
    // token 过期时间默认一个小时
    const options = {
      expiresIn: 60 * 60
    }
    const uuid = await tokenCreate(payload, userId, options, username)
    ctx.success('wx login success')
    // 登录成功后删除记录
    delete CODE_MAP[socketId]
    // 向客户端推送消息
    global.io.to(socketId).emit('wx-login', {
      uuid,
      userInfo: {
        username,
        userId,
        avatar
      }
    })
  } catch (error) {
    console.log(error)
    ctx.fail('', 5000)
  }
}

module.exports = {
  getCode,
  wxLogin
}
