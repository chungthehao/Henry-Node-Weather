// * 3rd party libraries
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/99b69968d981a6d44ccee378dbafd550/${latitude},${longitude}?units=si`
    request({ url, json: true }, (error, response) => { // error và response lúc nào cũng có 1 thằng undefined
        if (error !== null) { // low-level error (network,...)
            callback({ errorMsg: 'Unable to connect to weather service!' }, undefined)
        } else if (response.body.code === 400) { // other errors: input xàm (thay vì truyền số thì truyền string abc gì đó),...
            callback({ errorMsg: 'Unable to find location!' }, undefined)
        } else {
            // const data = response.body // setup option (json: true), nó tự parse body từ string thành js obj
            const {currently, daily} = response.body // current & daily forecast information
            const {temperature, precipProbability} = currently

            const summary = `${daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
            callback(undefined, { summary })
        }
    })
}

module.exports = forecast


// const url = 'https://api.darksky.net/forecast/99b69968d981a6d44ccee378dbafd550/37.8267,-122.4233?units=si'
// request({ url, json: true }, (error, response) => { // error và response lúc nào cũng có 1 thằng undefined
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.code === 400) {
//         console.log('Unable to find location!')
//     } else {
//         const data = response.body // setup option (json: true), nó tự parse body từ string thành js obj
//         const currently = data.currently // current forecast information
//         const daily = data.daily

//         console.log(`${daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`)
//     }
// })