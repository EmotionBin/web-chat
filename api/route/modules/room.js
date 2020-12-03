// 获取房间信息

const { databaseQuery } = require('../../utils/index')

module.exports = async ctx => {
  try {
    const { userId } = ctx.request.query
    const userList = await databaseQuery('select * from user')
    const roomInfo = await databaseQuery(`select * from room where roomId like '%${userId}%'`)
    const res = roomInfo.map(item => {
      if (item.type === 0) {
        // 群聊
        return {
          roomId: item.roomId,
          name: item.name,
          avatar: item.avatar,
          type: 0
        }
      } else {
        // 获取另一个用户的 userId
        const userId1 = item.roomId.replace(userId, '')
        const { username, avatar } = userList.find(item1 => item1.userId === userId1)
        // 单聊
        return {
          roomId: item.roomId,
          name: username,
          avatar,
          type: 0
        }
      }
    })
    ctx.success(res)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}
