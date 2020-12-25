const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const uniqueString = require('./unique-string')

/**
 * 保存文件
 * @param {String|Buffer} file base64 字符串或文件流
 * @param {*} type 0-保存 base64 字符串为文件 1-保存文件
 */
const saveFile = (file, type = 0) => {
  return new Promise((resolve, reject) => {
    if (type === 0) {
      // base64
      const id = uniqueString()
      const filePath = path.join(__dirname, `../../images/images/${id}.png`)
      // 过滤data:URL
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '')
      const dataBuffer = Buffer.from(base64Data, 'base64')
      fs.writeFile(filePath, dataBuffer, function (err) {
        if (err) {
          console.log('保存失败')
          reject(err)
        } else {
          console.log(`保存成功,路径为 /api/images/${id}.png`)
          // 获取图片宽高
          const dimensions = sizeOf(filePath)
          resolve({
            path: `/api/images/${id}.png?width=${dimensions.width}&height=${dimensions.height}`,
            filePath
          })
        }
      })
    } else {
      try {
        const filePath = path.join(__dirname, '../../images/images/wxcode.jpg')
        const writeStream = fs.createWriteStream(filePath)
        // 通过管道流将获取的文件写入
        file.pipe(writeStream)
        resolve('/api/images/wxcode.jpg')
      } catch (error) {
        console.log(error, '写入文件发生了错误')
        reject(error)
      }
    }
  })
}

module.exports = {
  saveFile
}
