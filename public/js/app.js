console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()

    const location = searchEl.value
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`//localhost:3000/weather?address=${location}`).then(response => {
        return response.json()
    }).then(({ error, location, forecast, address }) => {
        if (error) return message1.textContent = error

        message1.textContent = location
        message2.textContent = forecast
    })
})






// fetch('//puzzle.mead.io/puzzle').then(response => {
//     return response.json()
// }).then(({ puzzle }) => {
//     console.log(puzzle)
// })