const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
// Let views folder to be template
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// hbs module (default path in views folder, we changed it to templates folder up above, so add the second line)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static firectory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  // Render from the views folder
  res.render('index', {
    title: 'Weather App',
    name: 'Stephanie Wang'
  })
})

app.get('/about', (req, res) => {
  // Render from the views folder
  res.render('about', {
    title: 'About me',
    name: 'Stephanie Wang'
  })
})

app.get('/help', (req, res) => {
  // Render from the views folder
  res.render('help', {
    title: 'Help page',
    name: 'Stephanie Wang',
    msg: 'This is a page to help you'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    })
  } else {
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error
        })
      } 
      forecast(latitude, longtitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error: error
          })
        }
        res.send({
          location: location,
          address: req.query.address,
          forecastdata
        })
      })
    })
  }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    })
  } 
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Stephanie Wang',
    errorMsg: 'Help artical not found!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Stephanie Wang',
    errorMsg: 'Page not Found!'
  })
})


app.listen(8000, () => {
  console.log('Server is up on port 8000.')
})
