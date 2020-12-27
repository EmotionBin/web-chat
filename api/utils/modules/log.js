// // 日志写入
// const { databaseQuery } = require('../../utils/index')
// const router = require('../../route/router')

// module.exports = async function (ctx, data) {
//   const { path, headers: { uuid } } = ctx.request
//   const { name } = router.find(item => item.path === path)
//   // 查询用户信息
//   const userData = await databaseQuery(`select * from token where uuid='${uuid}'`)
//   const { username, userId } = userData[0]
//   console.log('日志写入', {
//     username,
//     userId,
//     time: +new Date() + '',
//     action: name
//   })
// }

module.exports = () => {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
