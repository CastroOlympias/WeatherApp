fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=0372eaa7cde1ce19de6c28dd0eb2454c')

.then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });