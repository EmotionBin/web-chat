// pages/login/index.js

import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    isLogin:false,
    password: ''
  },

  getPassword: function () {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    const password = (+(randomNum + timestamp)).toString(32)
    this.setData({
      password
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { socketId } = options
    console.log('socketId: ', socketId)
    if (!socketId) return
    const { data } = await request({
      url: '/wx/getCode',
      data: { socketId }
    })
    const { code } = data
    console.log('code: ', code)
    this.setData({
      code
    })
    console.log(this.data.code)
  },

  handleGetUserInfo: async function (e) {
    const { userInfo } = e.detail
    console.log(userInfo)
    const { status } = await request({
      url: '/wx/login',
      method: 'post',
      data: {
        user: {
          username: userInfo.nickName,
          avatar: userInfo.avatarUrl
        },
        code: this.data.code
      }
    })
    console.log('status: ', status)
    if (status) {
      this.setData({
        isLogin: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})