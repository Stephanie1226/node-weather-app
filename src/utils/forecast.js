const request = require('request')

const forecast = (latitude, longtitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=ee3c70846409f908e0ead75ee0a3b6d9&query=' + latitude + ',' + longtitude + '&units=m'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error){
      callback('Unable to find location!', undefined)
    }else {
      callback(undefined, {
        temperature: body.current.temperature,
        feels_like:  body.current.feelslike
      })
    }
  })
}

module.exports = forecast