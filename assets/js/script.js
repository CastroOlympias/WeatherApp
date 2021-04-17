fetch('https://api.openweathermap.org/data/2.5/weather?q=Salt Lake City&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')

.then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });

