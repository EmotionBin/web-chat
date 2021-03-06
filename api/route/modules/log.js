/**
 * 这里给 web-chat-admin 使用 用于查看记录 log 信息
 */
const { databaseQuery, getTimeRange } = require('../../utils')

// 数据概览
const getStatisticsOverview = async ctx => {
  try {
    const today = +new Date()
    const todayZero = getTimeRange(0)
    const yesterday = getTimeRange(-1)
    const lastWeek = getTimeRange(-6) // 最近一周 包括今天则为 -6 否则为 -7
    const lastThirty = getTimeRange(-29) // 最近三十天 包括今天则为 -29 否则为 -30
    const logList = await databaseQuery('select * from log where logType = 0')
    // 查昨天的数据必须精确到今天 00:00:00
    const yesterdayData = logList.filter(item => yesterday <= (+item.time) && (+item.time) < todayZero)
    const lastThirtyData = logList.filter(item => lastThirty <= (+item.time) && (+item.time) < today)
    const sumActivity = logList.length
    const yesterdayActivity = yesterdayData.length
    const yesterdayDataPeople = [...new Set(yesterdayData.map(item => item.userId))]
    const lastThirtyDataPeople = lastThirtyData.filter(item => item.action === '登录' || item.action === '微信登录')
    const weekData = []
    const oneDay = 24 * 60 * 60 * 1000
    for (let i = 0; i < 7; i++) {
      const start = lastWeek + (oneDay * i)
      const end = lastWeek + (oneDay * (i + 1))
      const thatDayLog = logList.filter(item => start <= (+item.time) && (+item.time) < end)
      const thatDayPeople = [...new Set(thatDayLog.map(item => item.userId))]
      weekData.push({
        date: start,
        people: thatDayPeople.length,
        activity: thatDayLog.length
      })
    }
    ctx.success({
      lastThirty: lastThirtyDataPeople.length,
      yesterday: yesterdayDataPeople.length,
      sumActivity,
      yesterdayActivity,
      weekData
    })
  } catch (error) {
    console.log(error)
    ctx.fail('', 5000)
  }
}

// 数据分析
const getStatisticsAnalysis = async ctx => {
  try {
    const { startTime, endTime } = ctx.request.query
    const logList = await databaseQuery(`select * from log where logType = 0 and time >= '${ startTime }' and time < '${ endTime }'`)
    let wxLoginTime = 0
    let loginTime = 0
    const timeRange = {
      '0:00-8:00': 0,
      '8:00-12:00': 0,
      '12:00-18:00': 0,
      '18:00-24:00': 0
    }
    logList.forEach(({ action, time }) => {
      action === '微信登录' && wxLoginTime++
      action === '登录' && loginTime++
      if (action === '微信登录' || action === '登录') {
        // 根据用户登录时间统计用户使用时间段
        const date = new Date(+time)
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let key = null
        if (hour < 8) {
          key = '0:00-8:00'
        } else if (hour >= 8 && hour < 12) {
          key = '8:00-12:00'
        } else if (hour >= 12 && hour < 18) {
          key = '12:00-18:00'
        } else {
          key = '18:00-24:00'
        }
        timeRange[key]++
      }
    })
    console.log('微信登录次数', wxLoginTime)
    console.log('普通登录次数', loginTime)
    ctx.success({
      wxLoginTime,
      loginTime,
      timeRange
    })
  } catch (error) {
    console.log(error)
    ctx.fail('', 5000)
  }
}

// 用户行为
const getUserOperation = async ctx => {
  try {
    const { userId, startTime, endTime, size, number } = ctx.request.query
    const logList = await databaseQuery(`select * from log where logType = 0 and userId like '%${userId}%' and time >= '${startTime}' and time < '${endTime}'`)
    const logPageList = logList.filter((item, index) => index < number * size && index >= (number - 1) * size)
    ctx.success({
      sum: logList.length,
      logPageList
    })
  } catch (error) {
    console.log(error)
    ctx.fail('', 5000)
  }
}

// 获取用户列表
const getLogUserList = async ctx => {
  try {
    const userInfo = await databaseQuery('select * from user')
    const result = userInfo.map(item => {
      delete item.password
      return item
    })
    ctx.success(result)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}

// 获取用户数据
const getUserData = async ctx => {
  try {
    const { userId, startTime, endTime } = ctx.request.query
    const logList = await databaseQuery(`select * from log where logType = 0 and userId like '%${userId}%' and time >= '${startTime}' and time < '${endTime}'
    and (action = '登录' or action = '微信登录')`)
    const timeRange = {
      '0:00-8:00': 0,
      '8:00-12:00': 0,
      '12:00-18:00': 0,
      '18:00-24:00': 0
    }
    logList.forEach(({ time }) => {
      // 根据用户登录时间统计用户使用时间段
      const date = new Date(+time)
      const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      let key = null
      if (hour < 8) {
        key = '0:00-8:00'
      } else if (hour >= 8 && hour < 12) {
        key = '8:00-12:00'
      } else if (hour >= 12 && hour < 18) {
        key = '12:00-18:00'
      } else {
        key = '18:00-24:00'
      }
      timeRange[key]++
    })
    ctx.success({
      sum: logList.length,
      timeRange
    })
  } catch (error) {
    console.log(error)
    ctx.fail('', 5000)
  }
}

module.exports = {
  getStatisticsOverview,
  getStatisticsAnalysis,
  getUserOperation,
  getLogUserList,
  getUserData
}
