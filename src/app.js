
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname) // Current script directory
//console.log(__filename) // The path to the file
//console.log(path.join(__dirname, '../public'))


// Initialize express
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
// set allows you to set a value to
// an express setting
app.set('view engine', 'hbs')
// The views folder
app.set('views', viewsPath)
// Partials path
hbs.registerPartials(partialsPath)

// Setup static directory to serve static files
app.use(express.static(publicDirectoryPath))



// Routes

app.get('', (req, res) => {

    // .render means to render a view
    // from the view engine we had set.
    // index is in the views folder.
    // should match the name from the folder
    res.render('index', {
        title: 'Weather App',
        name: 'Arjay'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arjay'
    })
})


//
// Goal: Create a template for help page
//
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Arjay'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({ 
            error: 'You need to provide an address' 
        })
    }else{

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

            if(error){
                return res.send({
                    error: error
                })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
        
                if(error){
                    return res.send({
                        error
                    })
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

//
// Goal: Wire up /weather
//
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location


app.get('/products', (req, res) => {

    // if no search term was provided.
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

// Match anything that hasn't been matched.
// 404 error page

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Arjay'
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Arjay'
    })
})

//
// Goal: Create and render a 404 page with handlebars
//
// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
//     - Page not found.
//     - Help article not found.
// 4. Test your work. Visit /what and /help/units





// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})