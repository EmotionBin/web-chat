// 这里封装请求
import axios from 'axios'
import { Message } from 'element-ui'
import codeList from '@/data/request'
import router from '@/router'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 5000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers.uuid = localStorage.getItem('uuid') || ''
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.status) {
      // status为0 失败
      // 控制只显示一个消息弹窗
      Message.closeAll()
      Message({
        message: codeList[res.code] || '请求失败',
        type: 'error'
      })
      // 未登录 记录当前页面并重定向到登录页面
      if (res.code === 4001) {
        router.push({
          name: 'login',
          query: {
            redirect: router.history._startLocation || '/home'
          }
        })
      }
      return Promise.reject(new Error(codeList[res.code] || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error.response)
    Message({
      message: codeList[error.response.data.code] || '请求失败',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
