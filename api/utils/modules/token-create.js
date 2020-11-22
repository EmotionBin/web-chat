// 生成 token

const jwt = require('jsonwebtoken')
const databaseQuery = require('./database-query')
const uniqueString = require('./unique-string')

/**
 * 生成 token
 * @param {Object} payload 写入 token 的负载
 * @param {String} secret 生成 token 的秘钥
 * @param {Object} options 生成 token 的设置 如过期时间
 * @param {String} username 用户名
 */
const tokenCreate = async (payload, secret, options, username) => {
  const token = jwt.sign(payload, secret, options)
  const uuid = `${uniqueString()}-${uniqueString()}-${uniqueString()}-${uniqueString()}`
  const res = await databaseQuery(`select * from token where userId = '${secret}'`)
  const sql = res.length
    ? `update token set token='${token}', uuid='${uuid}' where userId='${secret}'`
    : `insert into token values ('${username}','${uuid}','${token}','${secret}')`
  // 以前有记录则覆盖 没有记录则新增
  await databaseQuery(sql)
  return uuid
}

const tokenRefresh = async (payload, secret, options) => {
  const token = jwt.sign(payload, secret, options)
  await databaseQuery(`update token set token='${token}' where userId='${secret}'`)
}

module.exports = {
  tokenCreate,
  tokenRefresh
}
