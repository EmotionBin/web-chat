// 数据库查询
const mysql = require('mysql')

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'chat'
}

const query = async sql => {
  const connection = mysql.createConnection(config)
  await connection.connect()
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error)
      }
      connection.end()
      resolve(results)
    })
  })
}

module.exports = query
