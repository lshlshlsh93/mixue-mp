import swiperApi from '../../api/swiper'
import {
  userBehavior
} from '../../behaviors/user-behavior'
import goodsApi from '../../api/goods'
import goodsCategoryApi from '../../api/goods-category'
Page({
  behaviors: [userBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    headerStyle: '',
    swiperList: [],
    goodsList: [],
    currentCategoryIndex: 0,
    sidebarCurrent:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.makeHeaderStyle()
    this.fetchSwiperList()
    this.fetchData()
  },
  fetchSwiperList() {
    swiperApi.list().then(response => {
      this.setData({
        swiperList: response.data
      })
    })
  },
  fetchData() {
    goodsApi.tree().then(res => {
      this.setData({
        goodsList: res.result
      })
    })
  },
  /**
   * 头部样式
   */
  makeHeaderStyle() {
    const {
      top,
      bottom,
      height
    } = wx.getMenuButtonBoundingClientRect()
    const menuButtonCenterPoint = top + height / 2
    const headerStyle = 'margin-top: calc(' + menuButtonCenterPoint + 'px-32rpx);'
    this.setData({
      headerStyle
    })
  },
  /**
    跳转到门店页面
   */
  switchCurrentStore() {
    this.setCurrentStore(null)
    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 触发点餐侧边栏的事件
   * @param {*} e 
   */
  onSideBarChange(e) {
    this.setData({
      currentCategoryIndex: e.detail.current
    })
  },
  onGoodsListChange(e){
    this.setData({
      sidebarCurrent:e.detail.index
    })
  },
  onScroll(e) {
    const rect = wx.createSelectorQuery().select('section')
    console.log(rect);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})