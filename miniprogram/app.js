import userApi from './api/user'
import {
  userBehavior
} from './behaviors/user-behavior'
App({
  behaviors: [userBehavior], // 全局状态管理的behaviors
  globalData: {},
  onLaunch() {
    if (!this.isLogin()) {
      this.checkUser()
    }
  },
  /**
   * 获取当前位置
   *  TODO 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
   */
  loadCurrentLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.setStorageSync('location', {
          latitude,
          longitude
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },
  /**
   * 是否登录
   */
  isLogin() {
    return Boolean(wx.getStorageSync('user'))
  },
  /**
   * 检查用户的登录状态
   */
  checkUser() {
    wx.showLoading({
      title: '正在检查登录',
    })
    userApi.me().then(res => {
      if (res.data.length) {
        //  this.globalData.userInfo = res.data[0]
        wx.setStorageSync('user', res.data[0])
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
      wx.hideLoading()
    })
  }

})