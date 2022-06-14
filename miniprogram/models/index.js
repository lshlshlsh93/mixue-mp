import {
    configure
} from "mobx-miniprogram";

export {
    user
}
from './user'

export {
    global
}
from './global'

configure({
    enforceActions: "observed"
})