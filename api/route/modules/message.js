// 消息的获取 和消息的发送

const { databaseQuery } = require('../../utils/index')

const getMessage = async ctx => {
  try {
    const { roomId, messageId } = ctx.request.query
    console.log('messageId: ', messageId)
    const sql = messageId
      ? `select * from message where roomId = '${roomId}' and messageId<${messageId} order by messageId desc limit 20`
      : `select * from message where roomId = '${roomId}' order by messageId desc limit 20`
    const messageInfo = await databaseQuery(sql)
    const data = messageInfo.reverse().map(item => {
      return {
        ...item,
        message: decodeURI(item.message)
      }
    })
    ctx.success(data)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}

const sendMessage = async ctx => {
  try {
    const { roomId, time, img, message, messageType, userId, type, avatar, username } = ctx.request.body
    console.log('roomId, time, img, message, messageType, userId, type, avatar, username: ', roomId, time, img, message, messageType, userId, type, avatar, username)
    await databaseQuery(`insert into message values 
    ('${roomId}','${time}','${img}','${message}','${messageType}','${userId}','${type}','${avatar}','${username}',null)`)
    ctx.success()
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}

module.exports = {
  getMessage,
  sendMessage
}
