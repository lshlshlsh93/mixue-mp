// pages/index/index.js

const {
  default: swiper
} = require("../../api/swiper");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    current: 0
  },
  /**
   * 轮播图发生改变
   * @param {*} event 
   */
  onSwierChange(event) {
    // 当前索引
    const {
      current
    } = event.detail
    this.setData({
      current
    })
  },
  /**
   * 触碰轮播图的事件
   * @param {*} e 
   */
  onSwiperTap(e) {
    const {
      item
    } = e.currentTarget.dataset
    item.type === 'url' ? wx.navigateTo({
      url: `/pages/web-view/index?url=${item.target}`,
    }) : wx.navigateTo({
      url: `/pages/product/detail?id=${item.target}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    swiper.list().then(response => {
      this.setData({
        swiperList: response.data
      })
    })
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