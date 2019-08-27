// npm modules
const path = require ('path')
//console.log(__dirname) //For testing purposes

const express = require ('express')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Wheatly'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        constructionText: 'Under Construction!!!',
        title: 'Help',
        name: 'Wheatly'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        constructionText: 'Under Construction!!!',
        title: 'About Me',
        name: 'Wheatly'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an Address!' 
        })
    }

    geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get ("/Products", (req,res) => {
    if(!req.query.search) {
       return res.send({
           Error: 'You must provide a search term'
       }) 
    }


    res.send ({
        Products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render ('404', {
        title: '404 Page',
        ErrorMessage: 'Help article not found',
        name: 'Wheatly'
    })
})

app.get('*', (req, res) =>{
    res.render ('404', {
        title: '404 Page',
        ErrorMessage: 'Page Not Found',
        name: 'Wheatly'
    })
})



app.listen(port, () =>{
    console.log('Server is up on port ' + port)
}) 






