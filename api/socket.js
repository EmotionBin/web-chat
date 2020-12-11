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
  console.log('socket 连接成功!', socket.id)
  socket.on('login', data => userLogin(io, socket, data))
  socket.on('joinRoom', data => userJoin(io, socket, data))
  socket.on('message', data => onMessage(io, socket, data))
  socket.on('disconnecting', () => onDisconnecting(socket.id))
}

// 用户登录
const userLogin = async (io, socket, data) => {
  const res = await databaseQuery(`select * from online_user where userId = '${data.userId}'`)
  const sql = res.length
    ? `update online_user set socketId='${socket.id}' where userId='${data.userId}'`
    : `insert into online_user values ('${data.userId}', '${socket.id}')`
  console.log('sql: ', sql)
  await databaseQuery(sql)
  // 告诉客户端 socket 登录成功
  io.to(socket.id).emit('login-success', 'success')
}

// 有用户加入聊天室
const userJoin = async (io, socket, data) => {
  console.log(`用户${data.username}加入聊天室,id为${data.userId},聊天室类型为${data.type}`)
  if (!data.userId) return
  if (data.type === 0) {
    socket.broadcast.emit('broadcast', {
      ...data,
      message: `用户 ${data.username} 加入聊天室`,
      userId: 'system'
    })
  }
}

// 接收到了消息
const onMessage = async (io, socket, data) => {
  try {
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

// 用户退出
const onDisconnecting = async (socketId) => {
  try {
    console.log(`${socketId}退出`)
    await databaseQuery(`delete from online_user where socketId = '${socketId}'`)
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
