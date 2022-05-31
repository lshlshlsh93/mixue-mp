// pages/login/index.js

import userApi from '../../api/user'
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
    console.log(e);
    const phoneNumber = "17638990879";
    userApi.create({
      phoneNumber
    }).then(res => {
      userApi.me().then(res => {
        wx.setStorageSync('user', res.data[0])
        wx.navigateBack({
          delta: 0,
        })
      })
    })
    /**
     * 
     * 由于是个人开发无法获取手机号，所以暂时不使用云函数调用
     * 默认使用假数据
     * 
     */
    // const cloudId = e.detail.cloudID
    // wx.cloud.callFunction({
    //   name: 'get-phone-number',
    //   data: {
    //     weRunData: wx.cloud.CloudID(cloudId) // 这个CloudID值到云函数端会被替换
    //   }
    // }).then(res => {
    //   wx.setStorageSync("phoneNumber",res.result)
    //   let number = 17638990879;
    //   wx.setStorageSync("phoneNumber", number)
    //   wx.navigateBack({
    //     delta: 0,
    //   })
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(getApp().isLogin()){
      wx.navigateBack({
        delta: 0,
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