Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 值
     */
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前点击的第一个
    current: 0,
    linePositionX: 0,
    linePositionWidth: 0
  },
  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached() {
      this.calculateLinePositionX()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapClick(e) {
      const {
        index
      } = e.currentTarget.dataset
      this.setData({
        current: index
      })
      this.calculateLinePositionX(index)
    },
    calculateLinePositionX(index = 0) {
      this.createSelectorQuery().selectAll('.tab').boundingClientRect(results => {
        const rect = results[index]
        const currentCenterX = rect.left + rect.width / 2
        const linePositionWidth = rect.width * 0.8
        const linePositionX = (currentCenterX - linePositionWidth / 2) - results[0].left
        this.setData({
          linePositionX,
          linePositionWidth
        })
      }).exec()

    }
  }
})