// 获取云数据库
const db = wx.cloud.database()
const list = () => {
  return db.collection('mixue_swiper').get();
}
export default{
  list
}