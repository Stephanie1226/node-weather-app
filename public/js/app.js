const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  messageThree.textContent = ''
  messageFour.textContent = ''

// For running on our computer 
//fetch('http://localhost:8000/weather?address=' + location).then((response) => {
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = 'Local time is: ' + data.forecastdata.local_time
        messageThree.textContent = 'Today\'s temperature is ' + data.forecastdata.temperature + '°C, feels like ' + data.forecastdata.feels_like + '°C right now.'
        messageFour.textContent = 'Humidity is ' + data.forecastdata.humidity + '%.'
      }
    })
  })
})

//'The local time is' + body.location.localtime + '\n' + 'Today\'s temperature is' + body.current.temperature + 'feels like' + body.current.feelslike + '.'