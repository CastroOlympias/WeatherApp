var submitBtn = document.querySelector('#submit-btn');


function findWeather(event) {
event.preventDefault();
var searchTerm = document.querySelector('#city-search').value;
console.log(searchTerm);

    // current day weather and server api
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
    searchTerm + 
    '&units=imperial&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')

    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        console.log(response.name);

        // current days climate
        var cityDateEl = document.querySelector('#city-date')
        cityDateEl.textContent = response.name;

        var cityCurTempEl = document.querySelector('#cur-temp')
        cityCurTempEl.textContent = "Current Temperature: " + response.main.temp + " °F ";

        var cityMaxTempEl = document.querySelector('#max-temp')
        cityMaxTempEl.textContent = "Maximum Temperature: " + response.main.temp_max + " °F ";

        var cityMinTempEl = document.querySelector('#min-temp')
        cityMinTempEl.textContent = "Minimum Temperature: " + response.main.temp_min + " °F ";

        var cityWindEl = document.querySelector('#wind')
        cityWindEl.textContent = "Wind Speed: " + response.wind.speed + " Mph ";

        var cityWetEl = document.querySelector('#humid')
        cityWetEl.textContent = "Humidity: " + response.main.humidity + " % ";
    })
  
    // Five day forecast and servi api
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
    searchTerm + 
    '&units=imperial&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')


    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        console.log(response.name);

        // Plus one day wearther forecast
        var dayOneTempEl = document.querySelector('#day-one-temp')
        var dayOneWindEl = document.querySelector('#day-one-wind')
        var dayOneHumEl = document.querySelector('#day-one-hum')

        dayOneTempEl.textContent = "Temp: " + response.list[3].main.temp + " °F";
        dayOneWindEl.textContent = "Wind: " + response.list[3].wind.speed + " Mph";
        dayOneHumEl.textContent = "Humid: " + response.list[3].main.humidity + " %";



    })









    


}




submitBtn.onclick = findWeather;

        // cityDateEl.innerHTML = '';
        // cityDateEl.textContent = 'Shit';

    // .catch(function(error) {
        
    //     alert('No City Found!');
    // });