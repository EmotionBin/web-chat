// 获取房间信息

const { databaseQuery } = require('../../utils/index')

module.exports = async ctx => {
  try {
    const { roomId } = ctx.request.query
    const roomInfo = await databaseQuery(`select * from room where roomId like '%${roomId}%'`)
    roomInfo.map(item => {
      if (item.type === 0) {
        // 群聊
        return {
          roomId: item.roomId,
          name: item.name,
          avatar: item.avatar,
          type: 0
        }
      } else {
        // 单聊
        return {
          roomId: item.roomId,
          name: '',
          avatar: '',
          type: 1
        }
      }
    })
    ctx.success(roomInfo)
  } catch (error) {
    console.log('发生了错误', error)
    ctx.fail('', 5000)
  }
}
