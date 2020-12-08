const socket = require('socket.io')

// 与客户端连接成功
const connection = socket => {
  console.log('socket 连接成功!', socket)
  socket.on('message', data => {
    console.log('接收到了消息', data)
    broadcast(socket, 111)
  })
}

// 广播消息
const broadcast = (socket, data) => {
  socket.broadcast.emit('broadcast', data)
}

module.exports = server => {
  const io = socket(server)
  io.on('connection', connection)
}
