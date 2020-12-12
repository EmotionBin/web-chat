// 获取天气

const axios = require('axios')

module.exports = async ctx => {
  // 这里调用高德地图 API 获取位置信息
  // https://lbs.amap.com/api/webservice/guide/api/ipconfig
  // 第二套方案 使用 NOWAPI https://www.nowapi.com/api
  const { code } = ctx.query
  const KEY = 'e5b9d3f799c69ccb4ce80295c3034992'
  try {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${KEY}&city=${code}`
    const res = await axios.get(url)
    ctx.success({
      temperature: res.data.lives[0].temperature,
      weather: res.data.lives[0].weather
    })
  } catch (error) {
    console.log(error)
    ctx.fail('', 5000)
  }
}
