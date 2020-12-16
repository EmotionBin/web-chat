const fs = require('fs')
const path = require('path')
const uniqueString = require('./unique-string')

// 保存文件 目前只支持 base64 格式
const savefile = base64 => {
  return new Promise((resolve, reject) => {
    // 过滤data:URL
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
    const dataBuffer = Buffer.from(base64Data, 'base64')
    const id = uniqueString()
    const filePath = path.join(__dirname, `../../images/images/${id}.png`)
    fs.writeFile(filePath, dataBuffer, function (err) {
      if (err) {
        console.log('保存失败')
        reject(err)
      } else {
        console.log(`保存成功,路径为 /api/images/${id}.png`)
        resolve({
          path: `/api/images/${id}.png`,
          filePath
        })
      }
    })
  })
}

module.exports = {
  savefile
}