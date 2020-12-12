// 注册接口

const { databaseQuery, uniqueString, avatarCreate } = require('../../utils')

module.exports = async ctx => {
  let { username, password } = ctx.request.body
  username = username.trim()
  try {
    const res = await databaseQuery(`select * from user where username = '${username}'`)
    if (res.length) {
      // 如果能查到数据，说明该用户名已经被占用，不可再注册
      ctx.fail('', 5006)
    } else {
      const userId = uniqueString()
      const avatar = avatarCreate()
      await databaseQuery(`insert into user values ('${username}','${password}','${userId}','${avatar}')`)
      ctx.success(username)
    }
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}
