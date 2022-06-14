import {
    db
} from './cloud-init'
const _ = db.command
const storeList = (longitude, latitude) => {
    return db.collection('mixue_store').where({
            location: db.command.geoNear({
                geometry: db.Geo.Point(longitude, latitude),
                maxDistance: 5000,
            })
        })
        .limit(10).get()
}
const nearByStore = (location) => {
    return db.collection('mixue_store').where({
        location: db.command.geoNear({
            geometry: db.Geo.Point(location.longitude, location.latitude),
            maxDistance: 5000,
        })
    }).limit(1).get()
}
export default {
    storeList,
    nearByStore
}