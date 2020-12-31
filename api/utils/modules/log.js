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
  const { username } = user[0]
  logData.action = `查看用户${username}的个人信息`
  await databaseWrite(logData)
}

// 搜索用户
const searchUser = async function ({ logData, condition }) {
  logData.action = condition ? `搜索用户，输入的关键字为${condition}` : '搜索用户，输入的关键字为空'
  await databaseWrite(logData)
}

// socket 接收到消息
const onMessage = async function ({ logData, data }) {
  const { roomId, username, userId, type, messageType, message } = data
  logData.username = username
  logData.userId = userId
  if (type === 0) {
    // 用户在群聊中发送信息
    const room = await databaseQuery(`select * from room where roomId='${roomId}'`)
    const { name } = room[0]
    logData.action = messageType === 0 ? `在${name}中说${encodeURI(message)}` : `在${name}中发送了一张图片`
  } else {
    // 用户在单聊中发送消息
    const userId1 = roomId.replace(userId, '')
    const user = await databaseQuery(`select * from user where userId='${userId1}'`)
    logData.action = messageType === 0 ? `对用户${user[0].username}说${encodeURI(message)}` : `对用户${user[0].username}发送了一张图片`
  }
  await databaseWrite(logData)
}

// 用户退出
const onDisconnecting = async function ({ logData, data }) {
  const { userId } = data
  const user = await databaseQuery(`select * from user where userId='${userId}'`)
  logData.username = user[0].username
  logData.userId = userId
  logData.action = '退出系统'
  await databaseWrite(logData)
}

// 写入数据库
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
  searchUser,
  onMessage,
  onDisconnecting
}

module.exports = async function ({ ctx, status, router, logInfo }) {
  try {
    if (ctx) {
      // 普通网络请求
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
    } else {
      // socket 消息
      const logData = {
        username: '',
        userId: '',
        time: +new Date() + '',
        action: '',
        logType: 0,
        status
      }
      logTypeList[logInfo.type]({ logData, ...logInfo })
    }
  } catch (error) {
    console.log(error, '写入日志异常')
  }
}
