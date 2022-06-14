const {
  default: swiper
} = require("../../api/swiper");
import {
  userBehavior
} from '../../behaviors/user-behavior'
import storeApi from '../../api/store'
Page({
  behaviors: [userBehavior], // 全局状态管理的behaviors
  storeBindings: {
    fields: {
      phoneNumber: () => store.phoneNumber
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [], // 轮播图数据
    current: 0, // 当前轮播图图片索引
    nearByStore: null, //附近门店
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
    })
  },
  /**
   * 点击立即点餐卡片时跳转到点餐tab
   */
  onMenuCardClick() {
    wx.switchTab({
      url: '/pages/store/index',
    })
  },
  /**
   * banner-list点击事件
   */
  onArticleCilck() {
    wx.navigateTo({
      url: '/pages/web-view/index?url=http://baidu.com',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    storeApi.nearByStore(this.data.user.location).then(res => {
      !res.data.length || (this.setData({
        nearByStore: res.data[0]
      }))
    })
  },
})