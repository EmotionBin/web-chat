module.exports = (status = 0, data = '', detail = '服务端异常') => {
  return { status, data, detail }
}
