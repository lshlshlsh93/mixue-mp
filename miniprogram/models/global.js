import {observable,action} from "mobx-miniprogram"

export const global = observable({
    currentStore:null,
    setCurrentStore:action((store)=>{
        this.currentStore = store
    })
})