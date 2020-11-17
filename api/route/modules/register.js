const { databaseQuery } = require('../../utils/index')
const { result } = require('../../utils/index')

module.exports = async ctx => {
  let { username, password } = ctx.request.body
  let resData
  username = username.trim()
  try {
    const res = await databaseQuery(`select * from userinfo where username = '${username}'`)
    console.log(res)
    if (res.length) {
      // 如果能查到数据，说明该用户名已经被占用，不可再注册
      resData = result(0, '该用户名已经被占用')
    } else {
      // 将密码进行 base64 加密
      password = btoa(password)
      await databaseQuery(`insert into userinfo values ('${username}','${password}')`)
      resData = result(1, '注册成功', username)
    }
  } catch (error) {
    console.log('发生了错误', error)
    resData = result()
  }
  ctx.response.type = 'json'
  ctx.response.body = resData
}
