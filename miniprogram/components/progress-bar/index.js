// components/progress-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * progress血条的颜色
     */
    color: {
      type: String,
      value: null
    },
    /**
     * 背景色
     */
    trackColor: {
      type: String,
      value: ''
    },
    /**
     * 百分比
     */
    value: {
      type: Number,
      value: 0
    },
    /**
     * 血条的宽度
     */
    width: {
      type: String,
      value: null
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    trackStyle: '',
    barStyle: '',
  },
  /**
   * 生命周期
   */
  lifetimes: {
    attached() {
      this.buildTrackStyle();
      this.buildBarStyle();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 配置轨道的样式
     */
    buildTrackStyle() {
      let trackStyle = '';
      // 判断width是否存在，如果存在加入width属性
      // if (this.properties.width) {
      //   trackStyle += `width:${this.properties.width};`
      // }
      !this.properties.width || (trackStyle += `width:${this.properties.width};`)
      // 判断color是否存在，
      // if (this.properties.trackColor) {
      //   trackStyle += `background-color:${this.properties.trackColor};`
      // }
      !this.properties.trackColor || (trackStyle += `background-color:${this.properties.trackColor};`)
      this.setData({
        trackStyle
      })
    },
    buildBarStyle() {
      let barStyle = '';
      // 判断width是否存在，如果存在加入width属性
      // (this.properties.value <= 0 && this.properties.value >= 100) || (barStyle += `width:${this.properties.value}%;`)
      !(this.properties.value >= 0 && this.properties.value <= 100) || (barStyle += `width:${this.properties.value}%;`)
      // 判断color是否存在，
      !this.properties.color || (barStyle += `background-color:${this.properties.color};`)
      this.setData({
        barStyle
      })
    }
  }
})