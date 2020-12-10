import io from 'socket.io-client'

const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3808/' : '//www.huangweibinupup.cn/'

// const socket = io(server)

const socket = {
  io,
  server
}

export default socket
