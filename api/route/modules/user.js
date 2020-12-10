const { databaseQuery } = require('../../utils/index')

// 获取用户信息接口
const getUser = async ctx => {
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

// 获取好友列表
const getUserList = async ctx => {
  try {
    const userInfo = await databaseQuery('select * from user')
    const result = userInfo.map(item => {
      delete item.password
      return item
    })
    ctx.success(result)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}

// 搜索指定用户
const searchUser = async ctx => {
  try {
    const { username } = ctx.request.query
    const userInfo = await databaseQuery(`select * from user where username like '%${username}%'`)
    const result = userInfo.map(item => {
      delete item.password
      return item
    })
    ctx.success(result)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}

// 获取在线用户
const getOnlineUser = async ctx => {
  try {
    const userInfo = await databaseQuery('select * from user')
    const onlineUser = await databaseQuery('select * from online_user')
    console.log('onlineUser: ', onlineUser);
    const result = onlineUser.map(item => {
      const { username, userId, avatar } = userInfo.find(data => data.userId === item.userId)
      return {
        username,
        userId,
        avatar
      }
    })
    ctx.success(result)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}

module.exports = {
  getUser,
  getUserList,
  searchUser,
  getOnlineUser
}
