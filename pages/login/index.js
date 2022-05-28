// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 一键登录
   */
  login(e) {
    const cloudId = e.detail.cloudID
    wx.cloud.callFunction({
      name: 'get-phone-number',
      data: {
        weRunData: wx.cloud.CloudID(cloudId) // 这个CloudID值到云函数端会被替换
      }
    }).then(res => {
      // wx.setStorageSync("phoneNumber",res.result)
      let number = 17638990879;
      wx.setStorageSync("phoneNumber", number)
      wx.navigateBack({
        delta: 0,
      })
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