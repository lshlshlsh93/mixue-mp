import {db} from './cloud-init'
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
export default {
    storeList
}