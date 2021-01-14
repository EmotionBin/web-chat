/**
 * 这里给 web-chat-admin 使用 用于查看记录 log 信息
 */
const { databaseQuery, getTimeRange } = require('../../utils')

// 获取数据概览
const getStatisticsOverview = async ctx => {
  try {
    const today = +new Date()
    const todayZero = getTimeRange(0)
    const yesterday = getTimeRange(-1)
    const lastWeek = getTimeRange(-6) // 最近一周 包括今天则为 -6 否则为 -7
    const lastThirty = getTimeRange(-30)
    const logList = await databaseQuery('select * from log where logType = 0')
    // 查昨天的数据必须精确到今天 00:00:00
    const yesterdayData = logList.filter(item => yesterday <= (+item.time) && (+item.time) < todayZero)
    const lastThirtyData = logList.filter(item => lastThirty <= (+item.time) && (+item.time) < today)
    const sumActivity = logList.length
    const yesterdayActivity = yesterdayData.length
    const yesterdayDataPeople = [...new Set(yesterdayData.map(item => item.userId))]
    const lastThirtyDataPeople = [...new Set(lastThirtyData.map(item => item.userId))]
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

module.exports = {
  getStatisticsOverview
}
