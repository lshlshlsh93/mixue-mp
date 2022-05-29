import storeApi from '../../api/store'
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
const computedBehavior = require('miniprogram-computed').behavior

Page({
  behaviors: [computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    speed: 0,
    accuracy: 0,
    // 标记点
    markers: [{
      id: 1,
      title: '实例位置',
      latitude: 34.820556,
      longitude: 114.298353,
      iconPath: '../../assets/images/marker.png',
      width: '55rpx',
      height: '69rpx'
    }],
    // 门店列表
    storeList: [],
    dict: {
      'OPENING': '营业中',
      'CLOSED': '已关店'
    }
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
          iconPth: '../../assets/images/marker.png',
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
    const {latitude,longitude} = e.currentTarget.dataset.location
    wx.openLocation({
      latitude,
      longitude
    })
  },
  /**
   * 点击给对应带的门店打电话
   * @param {*} e 
   */
  call(e){
    const {phone} = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 初始化MapSdk
   */
  initMapSdk() {
    this.mapSdk = new QQMapWX({
      key: 'M3ABZ-5GSC2-HJIUS-C3HR5-5SDSV-A5BQZ'
    })
  },
  /**
   * 筛选门店列表
   */
  makeStoreList(storeList) {
    const locationList = storeList.map((item) => {
      const location = item.location;
      return {
        longitude: location.longitude,
        latitude: location.latitude
      }
    })
    /**
     * 计算距离
     */
    this.mapSdk.calculateDistance({
      to: locationList,
      success: (res) => {
        storeList.forEach((item, key) => {
          storeList[key]['distance'] = (res.result.elements[key].distance / 1000).toFixed(1)
        })
        console.log(res);
        this.setData({
          storeList
        })
      },
      fail: function (error) {
        console.error(error);
      }
    })
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
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        this.setData({
          latitude,
          longitude,
          speed,
          accuracy
        })
        this.fetchStoreList()
      }

    })
  },

  /**
   * 在地图上跳到当前位置
   */
  goToCurrentLocation() {
    this.mapContext.moveToLocation()
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