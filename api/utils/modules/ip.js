// 获取 ip 地址

module.exports = function getClientIP (req) {
  return req.headers['x-forwarded-for'] || req.headers['x-real-ip']
}
