Component({
    /**
     * 组件的属性列表
     */
    properties: {
        /**
         * 轮播图数据
         */
        list: {
            type: Array,
            value: []
        },
        /**
         * 大体样式
         * 主要是指定宽度和高度等
         */
        style: {
            type: String,
            value: ''
        },
        /**
         * 切换的样式
         */
        dotsStyle: {
            type: String,
            value: ''
        },
        /**
         * 轮播图是否显示圆角
         */
        round: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        current: 0, // 当前轮播图图片索引
    },
    /**
     * 组件的方法列表
     */
    methods: {
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
    }
})