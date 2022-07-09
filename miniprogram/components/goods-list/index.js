// components/goods-list/index.js
Component({

   /**
    * 组件的属性列表
    */
   options: {
      multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
   },
   properties: {
      list: {
         type: Array,
         value: []
      },
      current: {
         type: Number,
         value: 0
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      index:0
   },
   lifetimes: {
      attached() {
         this.createSelectorQuery().select('#menu-list').boundingClientRect(
            rect => {
               console.log(rect);
            }
         ).exec()
      }
   },
   /**
    * 组件的方法列表
    */
   methods: {
      onScroll(e){
         const rootTop = e.target.offsetTop
         this.createSelectorQuery().selectAll('.section').boundingClientRect(
            rects => {
              const result = rects.find(item=>{
                 return item.top <= rootTop && item.bottom >= rootTop
              })
              !result || this.changeIndex(result.dataset.index)
            }
         ).exec()
      },
      changeIndex(index){
         this.setData({
            index
         })
         this.triggerEvent('on-change',{index})
      }
   }
})