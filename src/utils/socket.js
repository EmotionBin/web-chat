import io from 'socket.io-client'

// const server = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3808/' : '//www.huangweibinupup.cn/'

const socket = io('/socket.io')

export default socket
