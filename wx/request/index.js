
export const request = (params) => {
  // 显示加载中效果
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  // 定义公共url
  const baseUrl = 'https://localhost:8081/api'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.data)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        // 关闭正在等待的图标
        wx.hideLoading()
      }
    })
  })
}
