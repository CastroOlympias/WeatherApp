var submitBtn = document.querySelector('#submit-btn');
var searchTerm = document.querySelector('#city-search')



function findWeather(event) {
event.preventDefault();
searchTerm = document.querySelector('#city-search').value;
console.log(searchTerm);

    // current day weather and server api call
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
    searchTerm + 
    '&units=imperial&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')

    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);

        var findCity = document.querySelector('#city-search').value;
        localStorage.setItem('City', JSON.stringify(findCity));
        console.log(findCity)

        // current days climate
        var currentCityEl = document.querySelector('#city-date')
        currentCityEl.textContent = response.name;


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
  
    // Five day forecast and server api call
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
    searchTerm + 
    '&units=imperial&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')


    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);

        // Plus one day wearther forecast
        var dayOneDateEl = document.querySelector('#day-one')
        var dayOneTempEl = document.querySelector('#day-one-temp')
        var dayOneWindEl = document.querySelector('#day-one-wind')
        var dayOneHumEl = document.querySelector('#day-one-hum')

        dayOneDateEl.textContent = response.list[3].dt_txt;
        dayOneTempEl.textContent = "Temp: " + response.list[3].main.temp + " °F";
        dayOneWindEl.textContent = "Wind: " + response.list[3].wind.speed + " Mph";
        dayOneHumEl.textContent = "Humid: " + response.list[3].main.humidity + " %";

        
        // Plus two days wearther forecast
        var dayTwoDateEl = document.querySelector('#day-two')
        var dayTwoTempEl = document.querySelector('#day-two-temp')
        var dayTwoWindEl = document.querySelector('#day-two-wind')
        var dayTwoHumEl = document.querySelector('#day-two-hum')

        dayTwoDateEl.textContent = response.list[11].dt_txt;
        dayTwoTempEl.textContent = "Temp: " + response.list[11].main.temp + " °F";
        dayTwoWindEl.textContent = "Wind: " + response.list[11].wind.speed + " Mph";
        dayTwoHumEl.textContent = "Humid: " + response.list[11].main.humidity + " %";

        // Plus three days wearther forecast
        var dayThreeDateEl = document.querySelector('#day-three')
        var dayThreeTempEl = document.querySelector('#day-three-temp')
        var dayThreeWindEl = document.querySelector('#day-three-wind')
        var dayThreeHumEl = document.querySelector('#day-three-hum')

        dayThreeDateEl.textContent = response.list[19].dt_txt;
        dayThreeTempEl.textContent = "Temp: " + response.list[19].main.temp + " °F";
        dayThreeWindEl.textContent = "Wind: " + response.list[19].wind.speed + " Mph";
        dayThreeHumEl.textContent = "Humid: " + response.list[19].main.humidity + " %";

        // Plus four days wearther forecast
        var dayFourDateEl = document.querySelector('#day-four')
        var dayFourTempEl = document.querySelector('#day-four-temp')
        var dayFourWindEl = document.querySelector('#day-four-wind')
        var dayFourHumEl = document.querySelector('#day-four-hum')

        dayFourDateEl.textContent = response.list[27].dt_txt;
        dayFourTempEl.textContent = "Temp: " + response.list[27].main.temp + " °F";
        dayFourWindEl.textContent = "Wind: " + response.list[27].wind.speed + " Mph";
        dayFourHumEl.textContent = "Humid: " + response.list[27].main.humidity + " %";

        // Plus five days wearther forecast
        var dayFiveDateEl = document.querySelector('#day-five')
        var dayFiveTempEl = document.querySelector('#day-five-temp')
        var dayFiveWindEl = document.querySelector('#day-five-wind')
        var dayFiveHumEl = document.querySelector('#day-five-hum')

        dayFiveDateEl.textContent = response.list[35].dt_txt;
        dayFiveTempEl.textContent = "Temp: " + response.list[35].main.temp + " °F";
        dayFiveWindEl.textContent = "Wind: " + response.list[35].wind.speed + " Mph";
        dayFiveHumEl.textContent = "Humid: " + response.list[35].main.humidity + " %";

        //loadWeather();
    })

    
}


// var loadWeather = function() {
// findCity = JSON.parse(localStorage.getItem('City'))
// findCity.textContent = searchTerm;
// console.log(searchTerm)
// }

submitBtn.onclick = findWeather;