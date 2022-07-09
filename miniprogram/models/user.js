import {
    observable,
    action
} from "mobx-miniprogram";

const userInStorage = wx.getStorageSync('user')
const locationStorage = wx.getStorageSync('location')
export const user = observable({
    //手机号
    phoneNumber: (userInStorage ? userInStorage.phone_number : null),
    // 位置信息
    currentLocation : (locationStorage ? locationStorage : null), 
    /**
     * 获取加密后的手机号
     */
    get desensitiveMobile() {
        let mobile = this.phoneNumber
        if (mobile) {
            mobile = mobile.replace(/^(\d{3})\d{6}(\d{2})$/, "$1******$2")
        }
        return mobile;
    },
    /**
     *  判断当前是否是登录状态
     */
    get isLogin() {
        return Boolean(this.phoneNumber)
    },
    /**
     * 更新手机号
     */
    updatePhoneNumber: action(function () {
        this.phoneNumber = userInStorage ? userInStorage.phone_number : null
    }),
    /**
     * 更新位置信息
     */
    updateCurrentLocation: action(function(){
        this.currentLocation = locationStorage ? locationStorage : null
    })
})