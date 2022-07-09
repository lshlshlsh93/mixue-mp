import {
    BehaviorWithStore
} from "mobx-miniprogram-bindings";
import {
    global
} from '../models/global'

export const globalBehavior = BehaviorWithStore({
    storeBindings: [{
        store: global,
        fields: ["currentStore"],
        actions: ["setCurrentStore"],
    }]
});