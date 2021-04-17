var submitBtn = document.querySelector('#submit-btn');


function findWeather(event) {
event.preventDefault();
var searchTerm = document.querySelector('#city-search').value;
console.log(searchTerm);


fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
searchTerm + 
'&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')

.then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });

}

submitBtn.onclick = findWeather;