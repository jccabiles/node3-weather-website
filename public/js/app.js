

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=> {
//         console.log(data)
//     })

    
// })

//Goal
//
// 1. Setup a call to fetch weather for Boston
// 2. Get the parse JSON response
//      - if error property, print error
//      - if no error property, print location and forecast
// 3. refresh the browser and test your work



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //browser will not auto refresh
    
    const  location = search.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ' '
    
    fetch('http://localhost:3000/weather?address='+ location).then((response)=> {
    response.json().then((data)=> {
        if(data.error) {
            messageOne.textContent = data.error //console.log(data.error)
        } else {
            messageOne.textContent = data.forecast //console.log(data.forecast)
            messageTwo.textContent = data.location //console.log(data.location)
        }

    })
})
})