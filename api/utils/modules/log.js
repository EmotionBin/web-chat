// // 日志写入
const databaseQuery = require('./database-query')

const databaseWrite = async ({ username, userId, time, action, status }) => {
  await databaseQuery(`insert into log values ('${username}','${userId}','${time}','${action}','${status}',null)`)
  console.log('写入完成')
}

module.exports = async function ({ ctx, status, router }) {
  const { path, headers: { uuid }, body: { username } } = ctx.request
  const { name } = router.find(item => item.path === path)
  const logInfo = {
    username: '',
    userId: '',
    time: +new Date() + '',
    action: name,
    status
  }
  const sql = uuid ? `select * from token where uuid = '${uuid}'` : `select * from user where username = '${username}'`
  // 查询用户信息
  const userData = await databaseQuery(sql)
  if (!userData.length) {
    // token 过期
    return
  }
  logInfo.username = userData[0].username
  logInfo.userId = userData[0].userId
  console.log('日志写入', logInfo)
  await databaseWrite(logInfo)
}
