// * Core module
const path = require('path')
// * npm module
const express = require('express')
const hbs = require('hbs')
// * our module
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname) // D:\_Hoc_Andrew_NodeJS\web-server\src
// console.log(__filename) // D:\_Hoc_Andrew_NodeJS\web-server\src\app.js
// console.log(path.join(__dirname, '../public')) // D:\_Hoc_Andrew_NodeJS\web-server\public

// * Tạo ra obj cho ứng dụng của mình, obj này chứa rất nhiều method để mình sử dụng cho việc xây dựng ứng dụng
const app = express() // Chỉ cần chạy express() 1 lần trong toàn ứng dụng thôi

// * Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// * Setup handlebars engine and views location
// - Nói cho express biết mình cài template engine (view engine) nào
// ! 'express' expect tất cả các views của mình (this case: handlebars template)
app.set('view engine', 'hbs')
// - Customize nơi (folder) chứa các file đuôi .hbs express nên tìm 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// - Customize this server to serve up 'public' folder
app.use(express.static(publicDirectoryPath)) // Setup static directory to serve

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Henry Chung'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Henry Chung'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Henry Chung',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (address === undefined) {
        return res.send({ error: 'Address must be provided.' })
    }

    geocode(address, (error, { location, latitude, longitude } = {}) => {
        if (error !== undefined) 
            return res.send({ error: error.errorMsg })
    
        // console.log(`${data.location}: ${data.latitude}, ${data.longitude}`)
        // const { location, latitude, longitude } = data
        forecast(latitude, longitude, (error, data) => {
            if (error !== undefined) 
                return res.send({ error: error.errorMsg })
    
            return res.send({
                location,
                forecast: data.summary,
                address
            })
        })
    })
    // res.send({ address })
})

app.get('/products', (req, res) => {
    if (req.query.search === undefined) {
        return res.send({ error: 'You must provide a search term' })
    }
    // console.log(req.query) // { search: 'games', rating: '5' }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Henry Chung',
        errorMsg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Henry Chung',
        errorMsg: 'Page not found.'
    })
})

// Start the server up (Chỉ cần chạy 1 lần cho toàn ứng dụng)
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// * Quy định khi ngta: request tới root domain (hoặc access qua browser) thì serve cái gì
// ! Khi có [app.use(express.static(publicDirectoryPath))] thì nó ko xuống đc tới đây, vì ở trên kia đã kiếm đc cái match
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>') // Đây là giá trị trả về khi ngta truy cập URL hoặc request từ code
// })

// app.get('/json1', (req, res) => {
//     res.send({
//         name: 'Henry',
//         age: 27
//     })
// })

// app.get('/json2', (req, res) => {
//     res.send([
//         { name: 'Ma Lau', age: 27 },
//         { name: 'Lu Xuya', age: 23 }
//     ])
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

