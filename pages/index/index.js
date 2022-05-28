// pages/index/index.js

const {
  default: swiper
} = require("../../api/swiper");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 当前轮播图图片索引
    current: 0,
    // 是否登录
    memberInfo: false,
    // isLogin:false
  },
  /**
   * 登录
   */
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
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
      }),
      this.loadMemberInfo();
  },
  loadMemberInfo() {
    // 如果手机号存在，就设置信息
    if (wx.getStorageSync('phoneNumber')) {
      this.setData({
        memberInfo: true
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
    this.loadMemberInfo();
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