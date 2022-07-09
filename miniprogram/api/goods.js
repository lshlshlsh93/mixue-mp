import {db,cloud} from './cloud-init'

const list = ()=>{
   return db.collection('goods').get()
}
const tree = () =>{
   return cloud.callFunction({
      name:'goods-list-with-category'
   })
}
export default{
   list,tree
}