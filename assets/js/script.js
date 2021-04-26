var submitBtn = document.querySelector('#submit-btn');

// Starts with an empty array
var findCity = [];
// console.log(localStorage.getItem("City"));

// gets local storage string of historical city searches and puts them back into an array, so storage isn't empty on refresh
findCity = JSON.parse(localStorage.getItem('City')) || [];
console.log(findCity);

// This foor loop is to append only the last 10 items found in the array of the search history. Code is still beta
function searchHistory() {
    for (var i = findCity.length -1; i >= 10; i--) {
        console.log(findCity[i])
        var button = document.createElement('button')
        button.textContent = findCity[i]
        history.append(button)
        console.log(history)
    }
}
searchHistory();

// This creates a button from the search, working beta, would like to create button from local storage to prevent duplicate buttons
function createBtn (searchValue) {
    var history = document.querySelector('.history');
    var lI = document.createElement('button')
    lI.textContent = searchValue
    lI.setAttribute('class', 'col-sm-12')
    lI.setAttribute('style', 'margin: 5px; background: lightgrey; border-radius: 5px; font-size: 25px; border: none;')
    history.append(lI)
}

// submit button begins the fuction to collect and apend the weather data to the webpage
submitBtn.onclick = findWeather;
function findWeather(event) {
    event.preventDefault();

    // Sets the searched cities as an array and stores into a variable for storage as a string of historical searches
    var searchTerm = document.querySelector('#city-search').value;
    createBtn(searchTerm)

    // This changes user input to all lowercase, stores only lower case values in local storage and prevents duplicates values
    var lowerCase = searchTerm.toLowerCase()
    //console.log(lowerCase);
    if (findCity.indexOf(lowerCase)=== -1) {
    findCity.push(lowerCase);
    localStorage.setItem('City', JSON.stringify(findCity));
    //console.log(findCity)
    }

    // current day weather with with current weather server api call
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
    searchTerm + 
    '&units=imperial&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')

    .then(function(response) {
        return response.json();   
    })
    .then(function(response) {
        console.log(response);

    // City, date and weather icon pus weather
        var currentCityEl = document.querySelector('#city')
        currentCityEl.textContent = response.name;

        // Current Date plus formatting date, insertng to html
        var currentDate = document.querySelector('#current-date')
        var today = moment().format('(MM/DD/YY)');
        //console.log(today)
        currentDate.textContent = today    

        // weather, climate conditions inserting to html
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

         // This inserts the curent weather icon to the page
         var currentWeathericonPartOne = 'http://openweathermap.org/img/wn/';
         var currentWeathericonPartTwo = response.weather[0].icon;
         var currentWeathericonPartThree = '@2x.png';
         var currentWholeIcon = currentWeathericonPartOne + currentWeathericonPartTwo + currentWeathericonPartThree;
         //console.log(currentWholeIcon);
 
         var currentIconWhole = document.querySelector('#current-weather-icon')
         currentIconWhole.setAttribute('src', currentWholeIcon);
    })

    .catch(err => {
        console.error(err);
        alert("Check that you've spelled your city correctly!")
    });
  
    // Five day forecast with forecast server api call
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' +
    searchTerm + 
    '&units=imperial&exclude=hourly,minutely,alerts&appid=0372eaa7cde1ce19de6c28dd0eb2454c')

    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);

    // Day 1 forecasting section
        // plus 1 day formatting date, inserting into html
        var plusOneDate = document.querySelector('.day-one')
        var dayPlusOne = moment().add(1, 'd').format('MM/DD/YY');
        //console.log(dayPlusOne)
        plusOneDate.textContent = dayPlusOne;

        // Plus 1 day wearther forecast, inserting into html
        var dayOneTempEl = document.querySelector('#day-one-temp')
        dayOneTempEl.textContent = "Temp: " + response.list[3].main.temp + " °F";

        var dayOneWindEl = document.querySelector('#day-one-wind')
        dayOneWindEl.textContent = "Wind: " + response.list[3].wind.speed + " Mph";

        var dayOneHumEl = document.querySelector('#day-one-hum')
        dayOneHumEl.textContent = "Humid: " + response.list[3].main.humidity + " %";

        // This inserts the plus 1 day weather icon to the page
        var plusOneWeatherIconPartOne = 'http://openweathermap.org/img/wn/';
        var plusOneWeatherIconPartTwo = response.list[3].weather[0].icon;
        var plusOneWeatherIconPartThree = '@2x.png';
        var plusOneWholeIcon = plusOneWeatherIconPartOne + plusOneWeatherIconPartTwo + plusOneWeatherIconPartThree;
        //console.log(plusOneWholeIcon);
        var plusOneIcon = document.querySelector('#plus-one-weather-icon')
        plusOneIcon.setAttribute('src', plusOneWholeIcon);

    // Day 2 forecasting section
        // plus 2 day formatting date, inserting into html
        var plusTwoDate = document.querySelector('.day-two')
        var dayPlusTwo = moment().add(2, 'd').format('MM/DD/YY');
        //console.log(dayPlusTwo)
        plusTwoDate.textContent = dayPlusTwo;

        // Plus 2 days wearther forecast
        var dayTwoTempEl = document.querySelector('#day-two-temp')
        dayTwoTempEl.textContent = "Temp: " + response.list[11].main.temp + " °F";

        var dayTwoWindEl = document.querySelector('#day-two-wind')
        dayTwoWindEl.textContent = "Wind: " + response.list[11].wind.speed + " Mph";

        var dayTwoHumEl = document.querySelector('#day-two-hum')
        dayTwoHumEl.textContent = "Humid: " + response.list[11].main.humidity + " %";

        // This inserts the plus 2 day weather icon to the page
        var plusTwoWeatherIconPartOne = 'http://openweathermap.org/img/wn/';
        var plusTwoWeatherIconPartTwo = response.list[11].weather[0].icon;
        var plusTwoWeatherIconPartThree = '@2x.png';
        var plusTwoWholeIcon = plusTwoWeatherIconPartOne + plusTwoWeatherIconPartTwo + plusTwoWeatherIconPartThree;
        //console.log(plusTwoWholeIcon);
        var plusTwoIcon = document.querySelector('#plus-two-weather-icon')
        plusTwoIcon.setAttribute('src', plusTwoWholeIcon);

    // Day 3 forecasting section
        // plus 3 day formatting date
        var plusThreeDate = document.querySelector('.day-three')
        var dayPlusThree = moment().add(3, 'd').format('MM/DD/YY');
        //console.log(dayPlusThree)
        plusThreeDate.textContent = dayPlusThree;

        // Plus 3 days weather forecast
        var dayThreeTempEl = document.querySelector('#day-three-temp')
        dayThreeTempEl.textContent = "Temp: " + response.list[19].main.temp + " °F";

        var dayThreeWindEl = document.querySelector('#day-three-wind')
        dayThreeWindEl.textContent = "Wind: " + response.list[19].wind.speed + " Mph";

        var dayThreeHumEl = document.querySelector('#day-three-hum')
        dayThreeHumEl.textContent = "Humid: " + response.list[19].main.humidity + " %";

        // This inserts the plus 3 day weather icon to the page
        var plusThreeWeatherIconPartOne = 'http://openweathermap.org/img/wn/';
        var plusThreeWeatherIconPartTwo = response.list[19].weather[0].icon;
        var plusThreeWeatherIconPartThree = '@2x.png';
        var plusThreeWholeIcon = plusThreeWeatherIconPartOne + plusThreeWeatherIconPartTwo + plusThreeWeatherIconPartThree;
        //console.log(plusThreeWholeIcon);
        var plusThreeIcon = document.querySelector('#plus-three-weather-icon')
        plusThreeIcon.setAttribute('src', plusThreeWholeIcon);


    // Day 4 forecasting section
        // plus 4 day formatting date
        var plusFourDate = document.querySelector('.day-four')
        var dayPlusFour = moment().add(4, 'd').format('MM/DD/YY');
        //console.log(dayPlusFour)
        plusFourDate.textContent = dayPlusFour;

        // Plus 4 days wearther forecast
        var dayFourTempEl = document.querySelector('#day-four-temp')
        dayFourTempEl.textContent = "Temp: " + response.list[27].main.temp + " °F";

        var dayFourWindEl = document.querySelector('#day-four-wind')
        dayFourWindEl.textContent = "Wind: " + response.list[27].wind.speed + " Mph";

        var dayFourHumEl = document.querySelector('#day-four-hum')
        dayFourHumEl.textContent = "Humid: " + response.list[27].main.humidity + " %";

        // This inserts the plus 4 day weather icon to the page
        var plusFourWeatherIconPartOne = 'http://openweathermap.org/img/wn/';
        var plusFourWeatherIconPartTwo = response.list[27].weather[0].icon;
        var plusFourWeatherIconPartThree = '@2x.png';
        var plusFourWholeIcon = plusFourWeatherIconPartOne + plusFourWeatherIconPartTwo + plusFourWeatherIconPartThree;
        //console.log(plusFourWholeIcon);
        var plusFourIcon = document.querySelector('#plus-four-weather-icon')
        plusFourIcon.setAttribute('src', plusFourWholeIcon);

    // Day 5 forecasting section
        // plus 5 day formatting date
        var plusFiveDate = document.querySelector('.day-five')
        var dayPlusFive = moment().add(5, 'd').format('MM/DD/YY');
        //console.log(dayPlusFive)
        plusFiveDate.textContent = dayPlusFive;

        // Plus 5 days wearther forecast
        var dayFiveTempEl = document.querySelector('#day-five-temp')
        dayFiveTempEl.textContent = "Temp: " + response.list[35].main.temp + " °F";

        var dayFiveWindEl = document.querySelector('#day-five-wind')
        dayFiveWindEl.textContent = "Wind: " + response.list[35].wind.speed + " Mph";

        var dayFiveHumEl = document.querySelector('#day-five-hum')
        dayFiveHumEl.textContent = "Humid: " + response.list[35].main.humidity + " %";

        // This inserts the plus 5 day weather icon to the page
        var plusFiveWeatherIconPartOne = 'http://openweathermap.org/img/wn/';
        var plusFiveWeatherIconPartTwo = response.list[35].weather[0].icon;
        var plusFiveWeatherIconPartThree = '@2x.png';
        var plusFiveWholeIcon = plusFiveWeatherIconPartOne + plusFiveWeatherIconPartTwo + plusFiveWeatherIconPartThree;
        //console.log(plusFiveWholeIcon);
        var plusFiveIcon = document.querySelector('#plus-five-weather-icon')
        plusFiveIcon.setAttribute('src', plusFiveWholeIcon);
    })
}


// for looping through the array of previously searched cities
// for (var i = 0; i < 10; i++);
// console.log(findCity);