console.log('Clientside Java Script is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

const weatherform = document.querySelector('form')
const Search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')


weatherform.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = Search.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
   
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
    response.json().then((data) => {
        if (data.error) {
            msg1.textContent = data.error
        } else {
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})
})