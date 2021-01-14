/**
 * 日期操作
 */

/**
* 获取时间范围 时间戳 毫秒
* @param {number} range 与今天相差的天数
* @return {number} 返回那天 00:00:00 的时间戳 单位毫秒
*/
const getTimeRange = function (range) {
  // 今天 00:00:00 的时间戳
  const today = +new Date(new Date().toLocaleDateString())
  const date = today + range * 24 * 60 * 60 * 1000
  return date
}

module.exports = {
  getTimeRange
}
