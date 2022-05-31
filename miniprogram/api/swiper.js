// 获取云数据库
import {db} from './cloud-init'
const list = () => {
  return db.collection('mixue_swiper').limit(10).get();
}
export default{
  list
}