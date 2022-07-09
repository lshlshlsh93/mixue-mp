import {
    BehaviorWithStore
} from "mobx-miniprogram-bindings";
import {
    user,
    global
} from '../models/index'
export const userBehavior = BehaviorWithStore({
    storeBindings: [{
            namespace: "user",
            store: user,
            fields: ["phoneNumber", "desensitiveMobile", "isLogin", "currentLocation"],
            actions: ["updatePhoneNumber", "updateCurrentLocation"],
        },
        {
            store: global,
            fields: ["currentStore"],
            actions: ["setCurrentStore"],
        }
    ]
});