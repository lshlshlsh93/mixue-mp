import {userBehavior} from '../../behaviors/user-behavior'
Page({
  behaviors: [ userBehavior ],
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})