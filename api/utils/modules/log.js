// 日志写入
const databaseQuery = require('./database-query')

// 获取聊天信息
const getMessage = async function ({ logData, condition }) {
  const room = await databaseQuery(condition)
  const roomData = room[0]
  if (!roomData) {
    // 该房间还没有创建
    return
  }
  if (roomData.type === 1) {
    // 单聊 查询对方用户名
    const userId1 = roomData.roomId.replace(logData.userId, '')
    const user = await databaseQuery(`select * from user where userId='${userId1}'`)
    logData.action = `查看与用户${user[0].username}的聊天信息`
  } else {
    // 群聊
    logData.action = `查看${roomData.name}的聊天信息`
  }
  await databaseWrite(logData)
}

// 获取用户信息
const getUser = async function ({ logData, condition }) {
  const user = await databaseQuery(condition)
  const userData = user[0]
  logData.action = `查看用户${userData.username}的个人信息`
  await databaseWrite(logData)
}

// 搜索用户
const searchUser = async function ({ logData, condition }) {
  logData.action = condition ? `搜索用户，输入的关键字为${condition}` : '搜索用户，输入的关键字为空'
  await databaseWrite(logData)
}

const databaseWrite = async ({ username, userId, time, action, logType, status }) => {
  try {
    await databaseQuery(`insert into log values ('${username}','${userId}','${time}','${action}','${logType}','${status}',null)`)
    console.log('写入完成')
  } catch (error) {
    console.log(error, '写入日志异常')
  }
}

// 类型汇总
const logTypeList = {
  getMessage,
  getUser,
  searchUser
}

module.exports = async function ({ ctx, status, router, logInfo }) {
  try {
    const { path, headers: { uuid }, body: { username } } = ctx.request
    const { name, logType } = router.find(item => item.path === path)
    const logData = {
      username: '',
      userId: '',
      time: +new Date() + '',
      action: name,
      logType,
      status
    }
    const sql = uuid ? `select * from token where uuid = '${uuid}'` : `select * from user where username = '${username}'`
    // 查询用户信息
    const userData = await databaseQuery(sql)
    if (!userData.length) {
      // token 过期
      return
    }
    logData.username = userData[0].username
    logData.userId = userData[0].userId
    logInfo.type ? logTypeList[logInfo.type]({ logData, ...logInfo }) : await databaseWrite(logData)
  } catch (error) {
    console.log(error, '写入日志异常')
  }
}
