import Vue from 'vue'
import io from 'socket.io-client'

const server = process.env.NODE_ENV === 'development' ? 'http://localhost:3808/' : '//www.huangweibinupup.cn:3808/'

// const socket = io(server)

const socket = {
  server,
  init () {
    const socket = io(server)
    console.log('socket 初始化完成', socket)
    // 初始化完成 挂载到原型链上
    Vue.prototype.$socket = socket
  }
}

export default socket
