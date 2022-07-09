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
    const { currentLocation } = this.data.user
    storeApi.nearByStore(currentLocation ).then(res => {
      !res.data.length || (this.setData({
        nearByStore: res.data[0]
      }))
    })
  },
})