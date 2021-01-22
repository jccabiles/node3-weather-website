const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'JR Cabiles',
        error: 'Page not found'
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: "About me!",
        name: "JR Cabiles"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help Page',
        name:"JR Cabiles"
        
    })
})

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Sarah',
//         age: 26
//     }])
// })
// app.get('/about', (req, res)=>{
//     res.send('<h1>About page!</h1>')
// })

app.get('/weather', (req, res)=>{
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else{
        geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
            if(error) {
                return res.send({error})
            }


            forecast(longitude, latitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
        

    }   
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search) 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'JR cabiles',
        error: 'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: "Error 404",
        name: 'JR Cabiles',
        error: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up in port 3000!')
})