const socket = require('socket.io')
const { databaseQuery } = require('./utils/index')

// socket 配置
const config = {
  cors: {
    origin: '*'
  }
}

// 与客户端连接成功
const connection = (io, socket) => {
  console.log('socket 连接成功!')
  socket.on('message', data => onMessage(io, socket, data))
}

// 接收到了消息
const onMessage = async (io, socket, data) => {
  try {
    console.log(`收到了消息${data}，即将写入数据库...`)
    const { roomId, time, img, message, messageType, userId, type, avatar, username } = data
    console.log('roomId, time, img, message, messageType, userId, type, avatar, username: ', roomId, time, img, message, messageType, userId, type, avatar, username)
    await databaseQuery(`insert into message values 
    ('${roomId}','${time}','${img}','${encodeURI(message)}','${messageType}','${userId}','${type}','${avatar}','${username}',null)`)
    // 获取刚插入的数据的 id 
    const messageInfo = await databaseQuery('select * from message order by messageId desc limit 1')
    const lastMessage = messageInfo[0]
    io.emit('broadcast', {
      ...lastMessage,
      message: decodeURI(lastMessage.message)
    })
  } catch (error) {
    console.log('发生了错误', error)
  }
}

// 广播消息
// const broadcast = (socket, data) => {
//   socket.broadcast.emit('broadcast', data)
// }

module.exports = server => {
  const io = socket(server, config)
  io.on('connection', socket => connection(io, socket))
}
