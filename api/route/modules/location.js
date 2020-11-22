// 根据 ip 获取位置

const axios = require('axios')
const { getClientIp } = require('../../utils')

module.exports = async ctx => {
  // 这里调用高德地图 API 获取位置信息
  // https://lbs.amap.com/api/webservice/guide/api/ipconfig
  // 第二套方案 使用 NOWAPI https://www.nowapi.com/api
  const KEY = 'e5b9d3f799c69ccb4ce80295c3034992'
  const ip = getClientIp(ctx.request)
  console.log('ip: ', ip)
  try {
    const url = ip === '127.0.0.1' ? `https://restapi.amap.com/v3/ip?key=${KEY}` : `https://restapi.amap.com/v3/ip?key=${KEY}&ip=${ip}`
    const { data: { city, adcode } } = await axios.get(url)
    console.log('city, adcode: ', city, adcode)
    ctx.success({
      location: city,
      code: adcode
    })
  } catch (error) {
    console.log(error)
  }
}
