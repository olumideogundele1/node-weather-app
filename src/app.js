const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname, 'templates/partials')

console.log(__dirname)
console.log(publicDirectoryPath)


app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',path.join(__dirname, 'templates/views'))
hbs.registerPartials(partialsPath)


app.get('',(req,res) => {
    res.render('index',{
        'title': 'Weather App',
        'location': 'Boston',
        'name': 'Andrew Mead'
    })
})

// app.get('/about',(req,res) => {
//     res.send('About weather page')
// })

// app.get('/weather',(req,res) => {
//     res.send('Todays weather is hot')
// })
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            'error': 'You must provide an address'
        })
    }
    geoCode(req.query.address,(error,{latitude, longitude, location } = {}) => {
        if(error)
            return res.send({
                'error': error
            })
        foreCast(latitude,longitude,(error,foreCastData) => {
                if(error){
                    return res.send({
                        'error': error
                    })
                }
                res.send({
                    forecast: foreCastData,
                    location: location,
                    address: req.query.address
                })
            })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})