
console.log('Client side Javascript is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {

//     response.json().then((data) => {
//         console.log(data)
//     })

// })

/*fetch('http://localhost:3000/weather?address=boston').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log('Location: ' + data.location + ' Forecast: ' + data.forecast)
        }

    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)                
                messageOne.textContent = data.error
            }else{
                // console.log('Location: ' + data.location + ' Forecast: ' + data.forecast)
                // messageTwo.textContent = ''
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })

    // console.log('Submitted')
})