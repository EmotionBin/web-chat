
// 生成随机数 范围 1-272
const random = () => {
  return Math.round(Math.random() * 272) + 1
}

module.exports = () => {
  return `/api/avatar/${random()}.jpeg`
}
