const request = require('request')


const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaGVucnljaHVuZyIsImEiOiJjanZqZG5qZGkwOWhvNDNwYnRwdWd6dzB6In0.TDJCqQGb3BdQKpe1GjMPmw&limit=1`
    debugger
    request({ url: geocodeURL, json: true }, (error, response) => {
        debugger
        if (error !== null) { // low-level error
            callback({ errorMsg: 'Unable to connect to location services!' }, undefined)
        } else if (response.body.features === undefined || response.body.features.length === 0) {
            callback({ errorMsg: 'Unable to find location! Try another search.' }, undefined)
        } else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined, { latitude, longitude, location })
        }
    })
}

module.exports = geocode


/**
 * * Geocoding
 * - Flow: Address --> Lat/Long --> Weather
 */
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/sai%20gon.json?access_token=pk.eyJ1IjoiaGVucnljaHVuZyIsImEiOiJjanZqZG5qZGkwOWhvNDNwYnRwdWd6dzB6In0.TDJCqQGb3BdQKpe1GjMPmw&limit=1'
// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) { // Low-level errors
//         console.log('unable to connect to location services!')
//     } else if (!response.body.features || !response.body.features.length) {
//         console.log('Unable to find location! Try again with a different search term.')
//     } else {
//         const features = response.body.features[0]
//         console.log(`${features.center[0]}/${features.center[1]}`)
//     }
// })