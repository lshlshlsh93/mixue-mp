import userApi from './api/user'
App({
  onLaunch() {
    if (!this.isLogin()) {
      this.checkUser()
    }

  },
  globalData: {},
  isLogin() {
    return Boolean(wx.getStorageSync('user'))
  },
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