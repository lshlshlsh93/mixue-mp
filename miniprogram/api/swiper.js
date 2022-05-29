// 获取云数据库
const db = wx.cloud.database()
const list = () => {
  return db.collection('mixue_swiper').limit(10).get();
}
export default{
  list
}