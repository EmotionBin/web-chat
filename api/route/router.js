const register = require('./modules/register')
const login = require('./modules/login')
const getLocation = require('./modules/location')
const getWeather = require('./modules/weather')
const { getUser, getUserList, searchUser, getOnlineUser } = require('./modules/user')
const getRoom = require('./modules/room')
const { getMessage, sendMessage } = require('./modules/message')
const { getAccessToken, getWxQrcode, getCode, wxLogin } = require('./modules/wx')
const { getStatisticsOverview, getStatisticsAnalysis, getUserOperation, getLogUserList } = require('./modules/log')

const auth = true

const log = true

const logType = 0

// 后台接口路由列表
const route = [
  {
    type: 'post', // 请求类型
    path: '/register', // 请求路径
    callback: register, // 接收到请求后的回调
    auth: false, // 是否需要检测 token
    logType, // 0-用户手动触发 1-非用户手动触发
    log, // 是否需要写入日志
    name: '注册' // 接口名称
  },
  {
    type: 'post',
    path: '/login',
    callback: login,
    auth: false,
    logType,
    log,
    name: '登录'
  },
  {
    type: 'get',
    path: '/getLocation',
    callback: getLocation,
    auth,
    logType: 1,
    log,
    name: '获取位置信息'
  },
  {
    type: 'get',
    path: '/getWeather',
    callback: getWeather,
    auth,
    logType: 1,
    log,
    name: '获取天气信息'
  },
  {
    type: 'get',
    path: '/getUser',
    callback: getUser,
    auth,
    logType,
    log,
    name: '获取用户信息'
  },
  {
    type: 'get',
    path: '/getUserList',
    callback: getUserList,
    auth,
    logType,
    log,
    name: '查看通讯录'
  },
  {
    type: 'get',
    path: '/searchUser',
    callback: searchUser,
    auth,
    logType,
    log,
    name: '搜索用户'
  },
  {
    type: 'get',
    path: '/getRoom',
    callback: getRoom,
    auth,
    logType: 1,
    log,
    name: '获取房间信息'
  },
  {
    type: 'get',
    path: '/getMessage',
    callback: getMessage,
    auth,
    logType,
    log,
    name: '获取聊天信息'
  },
  {
    type: 'get',
    path: '/getOnlineUser',
    callback: getOnlineUser,
    auth,
    logType: 1,
    log,
    name: '获取当前在线用户'
  },
  {
    type: 'post',
    path: '/sendMessage',
    callback: sendMessage,
    auth,
    logType,
    log,
    name: '发送信息'
  },
  {
    type: 'get',
    path: '/wx/getAccessToken',
    callback: getAccessToken,
    auth: false,
    logType: 1,
    log: false,
    name: '获取微信accessToken'
  },
  {
    type: 'post',
    path: '/wx/getWxQrcode',
    callback: getWxQrcode,
    auth: false,
    logType,
    log: false,
    name: '获取小程序二维码'
  },
  {
    type: 'get',
    path: '/wx/getCode',
    callback: getCode,
    auth: false,
    logType,
    log: false,
    name: '进入微信小程序'
  },
  {
    type: 'post',
    path: '/wx/login',
    callback: wxLogin,
    auth: false,
    logType,
    log,
    name: '完成微信登录'
  },
  {
    type: 'get',
    path: '/log/getStatisticsOverview',
    callback: getStatisticsOverview,
    auth,
    logType,
    log: false,
    name: '获取数据概览数据'
  },
  {
    type: 'get',
    path: '/log/getStatisticsAnalysis',
    callback: getStatisticsAnalysis,
    auth,
    logType,
    log: false,
    name: '获取数据分析数据'
  },
  {
    type: 'get',
    path: '/log/getUserOperation',
    callback: getUserOperation,
    auth,
    logType,
    log: false,
    name: '获取用户行为数据'
  },
  {
    type: 'get',
    path: '/log/getLogUserList',
    callback: getLogUserList,
    auth,
    logType,
    log: false,
    name: '获取用户列表'
  }
]

module.exports = route
