// 消息的获取 和消息的发送

const { databaseQuery } = require('../../utils/index')

const getMessage = async ctx => {
  try {
    const { roomId } = ctx.request.query
    const messageInfo = await databaseQuery(`select * from message where roomId = '${roomId}' order by messageId desc limit 20`)
    ctx.success(messageInfo.reverse())
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
