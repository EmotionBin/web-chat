const socket = require('socket.io')
const { databaseQuery, saveFile, log } = require('./utils/index')

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
  socket.on('leaveRoom', data => userLeave(io, socket, data))
  socket.on('message', data => onMessage(io, socket, data))
  socket.on('logout', () => onDisconnecting(socket, io))
  socket.on('disconnecting', () => onDisconnecting(socket, io))
}

// 用户登录
const userLogin = async (io, socket, data) => {
  try {
    const res = await databaseQuery(`select * from online_user where userId = '${data.userId}'`)
    const sql = res.length
      ? `update online_user set socketId='${socket.id}' where userId='${data.userId}'`
      : `insert into online_user values ('${data.userId}', '${socket.id}')`
    console.log('sql: ', sql)
    await databaseQuery(sql)
    // 告诉客户端 socket 登录成功
    io.emit('login-success')
  } catch (error) {
    console.log('socket 登录失败', error)
  }
}

// 有用户加入聊天室
const userJoin = async (io, socket, data) => {
  console.log(`用户${data.username}加入聊天室,id为${data.userId},聊天室类型为${data.type},房间id为${data.roomId}`)
  if (!data.userId) return
  // 加入 socket 房间
  socket.join(data.roomId)
  if (data.type === 0) {
    socket.to(data.roomId).emit('broadcast', {
    // socket.broadcast.emit('broadcast', {
      ...data,
      message: `用户 ${data.username} 加入聊天室`,
      userId: 'system'
    })
  }
}

// 有用户离开聊天室
const userLeave = async (io, socket, data) => {
  console.log(`用户${data.username}离开聊天室,id为${data.userId},聊天室类型为${data.type},房间id为${data.roomId}`)
  if (!data.userId) return
  // 加入 socket 房间
  socket.leave(data.roomId)
  if (data.type === 0) {
    socket.to(data.roomId).emit('broadcast', {
    // socket.broadcast.emit('broadcast', {
      ...data,
      message: `用户 ${data.username} 离开聊天室`,
      userId: 'system'
    })
  }
}

// 接收到了消息
const onMessage = async (io, socket, data) => {
  try {
    const { roomId, time, img, message, messageType, userId, type, avatar, username } = data
    console.log('roomId, time, img, message, messageType, userId, type, avatar, username: ', roomId, time, message, messageType, userId, type, avatar, username)
    const roomInfo = await databaseQuery(`select * from room where roomId = '${roomId}'`)
    if (!roomInfo.length) {
      // 没有该房间信息 创建房间
      await databaseQuery(`insert into room values ('${roomId}','${username}','${avatar}','${type}')`)
    }
    if (messageType) {
      // 图片消息
      const { path, filePath } = await saveFile(img)
      console.log('保存图片完成', filePath, path)
      // 将图片路径写入数据库
      await databaseQuery(`insert into message values 
      ('${roomId}','${time}','${path}','${encodeURI(message)}','${messageType}','${userId}','${type}','${avatar}','${username}',null)`)
    } else {
      // 文字消息
      await databaseQuery(`insert into message values 
      ('${roomId}','${time}','${img}','${encodeURI(message)}','${messageType}','${userId}','${type}','${avatar}','${username}',null)`)
    }
    // 获取刚插入的数据的 id
    const messageInfo = await databaseQuery('select * from message order by messageId desc limit 1')
    const lastMessage = messageInfo[0]
    io.to(data.roomId).emit('broadcast', {
      ...lastMessage,
      message: decodeURI(lastMessage.message)
    })
    // 写入日志
    const logInfo = {
      type: 'onMessage',
      data
    }
    log({
      status: 1,
      logInfo
    })
  } catch (error) {
    console.log('接收到了消息，但是发生了错误', error)
  }
}

// 用户退出
const onDisconnecting = async (socket, io) => {
  try {
    console.log(`${socket.id}退出`)
    // 先查出信息再删除记录 因为要写入日志
    const user = await databaseQuery(`select * from online_user where socketId = '${socket.id}'`)
    await databaseQuery(`delete from online_user where socketId = '${socket.id}'`)
    socket.broadcast.emit('exit')
    // 写入日志
    const logInfo = {
      type: 'onDisconnecting',
      data: user[0]
    }
    log({
      status: 1,
      logInfo
    })
  } catch (error) {
    console.log('用户退出，发生了错误', error)
  }
}

module.exports = server => {
  const io = socket(server, config)
  // 全局挂载
  global.io = io
  io.on('connection', socket => connection(io, socket))
}
