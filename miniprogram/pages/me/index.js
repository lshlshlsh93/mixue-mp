// pages/me/index.js
const computedBehavior = require('miniprogram-computed').behavior
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },
  computed: {
    desensitiveMobile(data) {
      if(!data.userInfo){
        return ''
      }
      let mobile = data.userInfo.phone_number
      if (mobile) {
        mobile = mobile.replace(/^(\d{3})\d{6}(\d{2})$/, "$1******$2")
      }
      return mobile;
    }
  },

  login() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  toCustomPage(e){
    const {code} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/custom-page/index?code=${code}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const userInfo = wx.getStorageSync('user')
    this.setData({
      userInfo
    })
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