// npm modules
const path = require ('path')
console.log(__dirname)

const Express = require ('express')
const hbs = require ('hbs')
const geocode = require ("./utils/Geocode")
const forecast = require ("./utils/Forecast")


const App = Express()
const port = process.env.PORT || 3000


// Define paths for Express config
const PublicDirectory = path.join(__dirname, '../Public')
const ViewsPath = path.join(__dirname,'../Templates/Views')
const PartialsPath = path.join(__dirname, '../Templates/Partials')

// Set handlebars engine and views location
App.set('view engine','hbs')
App.set('views', ViewsPath)
hbs.registerPartials(PartialsPath)

// Setup static directory to server
App.use(Express.static(PublicDirectory))


App.get('/Help', (req,res) => {
    res.render('Help', {
        HelpText: 'Help Text Demo',
        title: 'Help',
        name: 'Wheatly'
    })
})

App.get('/About', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Wheatly'
    })
})


App.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Wheatly'
    })
})

App.get('/Weather', (req, res) => {
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

App.get ("/Products", (req,res) => {
    if(!req.query.search) {
       return res.send({
           Error: 'You must provide a search term'
       }) 
    }


    res.send ({
        Products: []
    })
})

App.get('/Help/*', (req, res) => {
    res.render ('404', {
        title: '404 Page',
        ErrorMessage: 'Help article not found',
        name: 'Wheatly'
    })
})

App.get('*', (req, res) =>{
    res.render ('404', {
        title: '404 Page',
        ErrorMessage: 'Page Not Found',
        name: 'Wheatly'
    })
})



App.listen(port, () =>{
    console.log('Server is up on port' + port)
}) 






