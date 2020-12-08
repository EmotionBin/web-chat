const socket = require('socket.io')

// socket 配置
const config = {
  cors: {
    origin: '*'
  }
}

// 与客户端连接成功
const connection = socket => {
  console.log('socket 连接成功!')
  socket.on('message', data => onMessage(socket, data))
}

// 接收到了消息
const onMessage = (socket, data) => {
  console.log(`即将发送消息${data}`)
  socket.emit('broadcast', data)
}

// 广播消息
// const broadcast = (socket, data) => {
//   socket.broadcast.emit('broadcast', data)
// }

module.exports = server => {
  const io = socket(server, config)
  io.on('connection', connection)
}
