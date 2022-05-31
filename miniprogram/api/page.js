import {db}  from './cloud-init'
const list = (code)=>{
    return db.collection('page').where({
        code
    }).get()
} 
export default{
    list
}