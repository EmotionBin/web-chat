// 这里会写一些可以复用的功能

const utils = {}

/**
 * 打开一个新的页面
 * @param {string} url 要打开的 url
 */
utils.open = function (url) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'web-chat-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('web-chat-link-temp'))
}

/**
 * 防抖
 * @param {Function} cb 防抖时执行的回调
 * @param {number} wait 防抖时间间隔
 * @param {immediate} immediate 是否马上执行一次
 */
utils.debounce = function (cb, wait, immediate) {
  let timer
  return function () {
    const args = arguments
    const context = this
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) return cb.apply(context, args)
    } else {
      timer = setTimeout(function () {
        return cb.apply(context, args)
      }, wait)
    }
  }
}

/**
 * 动态生成图片的宽高
 * @param {String} image 图片的路径
 */
utils.dynamicImageSize = function (image) {
  let width = 200
  let height = 150
  const imageData = /width=([0-9]+)&height=([0-9]+)/.exec(image)
  if (imageData) {
    const natureWidth = +imageData[1]
    const naturehHeight = +imageData[2]
    let scale = 1
    if (natureWidth * scale > width) {
      scale = width / natureWidth
    }
    if (naturehHeight * scale > height) {
      scale = height / naturehHeight
    }
    width = natureWidth * scale
    height = naturehHeight * scale
  }
  return {
    width,
    height
  }
}

export default utils
