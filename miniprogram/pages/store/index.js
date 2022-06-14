import storeApi from '../../api/store'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
const computedBehavior = require('miniprogram-computed').behavior
const key = 'M3ABZ-5GSC2-HJIUS-C3HR5-5SDSV-A5BQZ'
const chooseLocation = requirePlugin('chooseLocation');
import {
  globalBehavior
} from '../../behaviors/global-bbehavior'
import {
  userBehavior
} from '../../behaviors/user-behavior'
Page({
  behaviors: [globalBehavior, userBehavior, computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 头部显示的数据列表
     */
    headerTabs: [{
      value: 'nearby',
      label: '附近门店'
    }, {
      value: 'recent',
      label: '常去门店'
    }],
    // 位置信息(经度、维度)
    latitude: 0,
    longitude: 0,
    // 标记点
    markers: [{
      id: 1, //标记点 id
      title: '', // 标注点名
      latitude: 34.81568,
      longitude: 114.35461,
      iconPath: '../../assets/images/marker.png',
      width: '55rpx',
      height: '69rpx'
    }],
    // 门店列表
    storeList: [],
    // 数据字典
    dict: {
      'OPENING': '营业中',
      'CLOSED': '已关店'
    },
    // 是否展示门店显示弹窗详情
    storeDetailShow: false,
    // 当前点击的店名
    // currentStore: null,
    // 是否收起地图
    collapse: false
  },
  computed: {
    markers(data) {
      return data.storeList.map((item, index) => {
        return {
          id: index + 1,
          key: item._id,
          title: item.name,
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          iconPath: '../../assets/images/marker.png',
          width: '55rpx',
          height: '69rpx'
        }
      })
    }
  },
  mapContext: null,
  mapSdk: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initMapSdk()
    this.loadCurrentLocation()
    this.initMapContext()
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  },
  goToMenu(e) {
    console.log(e);
    const {
      storeId
    } = e.currentTarget.dataset
    console.log(storeId);
    wx.navigateTo({
      url: `/pages/menu/index?storeId=${storeId}`,
    })
  },
  /**
   * 当点击地图上的标记点时触发的事件
   */
  onMarkerTab(e) {
    const {
      markerId
    } = e.detail
    const currentStore = this.data.storeList[markerId - 1]
    this.setData({
      storeDetailShow: true,
      currentStore: currentStore
    })
  },
  /**
   * 搜索门店
   */
  chooseLocation() {
    const referer = '醚雪冰城测试'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    });
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
    });
  },
  /**
   * 显示展开地图还是收起地图
   */
  collapse() {
    this.setData({
      collapse: !this.data.collapse
    })
  },
  /**
   * 点击对应的店名打开弹窗显示对应的店名信息
   * @param {*} e 
   */
  popupStoreDetail(e) {
    const {
      store
    } = e.currentTarget.dataset
    this.setData({
      currentStore: store,
      storeDetailShow: true
    })
  },
  /**
   * 获取门店列表
   */
  fetchStoreList() {
    storeApi.storeList(this.data.longitude, this.data.latitude).then(res => {
      this.makeStoreList(res.data)
    })
  },
  /**
   * 点击门店列表的位置箭头跳转到对应的门店位置
   */
  navigateLocation(e) {
    const {
      latitude,
      longitude
    } = e.currentTarget.dataset.location
    wx.openLocation({
      latitude,
      longitude
    })
  },
  /**
   * 点击给对应带的门店打电话
   * @param {*} e 
   */
  call(e) {
    const {
      phone
    } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 初始化MapSdk
   */
  initMapSdk() {
    this.mapSdk = new QQMapWX({
      key
    })
  },
  /**
   * 筛选门店列表
   */
  makeStoreList(storeList) {
    /**
     * 判断当前门店列表是否为空
     */
    if (storeList.length === 0) {
      this.setData({
        storeList: []
      })
    }
    const locationList = storeList.map((item) => {
      const location = item.location;
      return {
        longitude: location.longitude,
        latitude: location.latitude
      }
    })
    /**
     * 如果当前位置的附近门店列表不为空
     *  那么就计算距离当前位置门店的距离
     *  否则不进行计算距离操作
     */
    if (locationList.length) {
      /**
       * 计算距离
       */
      this.mapSdk.calculateDistance({
        from: {
          latitude: this.data.latitude,
          longitude: this.data.longitude
        },
        to: locationList,
        success: (res) => {
          storeList.forEach((item, key) => {
            storeList[key]['distance'] = (res.result.elements[key].distance / 1000).toFixed(1)
            storeList[key]['originDistance'] = res.result.elements[key].distance
          })
          this.setData({
            storeList
          })
        },
        fail: (error) => {
          console.error(error);
          this.setData({
            storeList: [],
          })
        }
      })
    }
  },
  /**
   * 加载context
   */
  initMapContext() {
    wx.createSelectorQuery().select('#store-map').context((res) => {
      this.mapContext = res.context
    }).exec()
  },
  /**
   * 获取当前位置
   *  TODO 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
   */
  loadCurrentLocation() {
    let {
      latitude,
      longitude
    } = this.data.user.location
    console.log(latitude, longitude);
    this.setData({
      latitude,
      longitude
    })
    this.fetchStoreList()
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: (res) => {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     this.setData({
    //       latitude,
    //       longitude
    //     })
    //     this.fetchStoreList()
    //   }
    // })

  },

  /**
   * 在地图上跳到当前位置
   */
  goToCurrentLocation() {
    this.mapContext.moveToLocation()
    this.loadCurrentLocation()

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

    /**
     * 获取搜索门店里搜索的详细位置信息
     */
    const locaction = chooseLocation.getLocation();
    if (locaction) {
      const {
        longitude,
        latitude,
        address,
        city,
        district,
        province,
        name
      } = locaction
      this.setData({
        latitude,
        longitude
      })
      this.fetchStoreList()

    }

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