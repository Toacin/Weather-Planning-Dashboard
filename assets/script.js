$citySubmit = $(`#searchButton`);
let date = '';
let temp = '';
let wind = '';
let humidity = '';
let uvIndex = '';
let iconURL = '';
let dailyDate = [];
let dailyTemp = [];
let dailyWind = [];
let dailyHumidity = [];
let dailyIconURL = [];
let $submittedCity = '';

// on submission of a city name, this function will start weather gathering functions, if certain checks are passed.
function citySubmitHandler() {
    $submittedCity = $citySubmit.siblings(`input`).val().trim().toUpperCase();
    searchedCities = [];
    // this will append previously stored searched cities into an arry
    for (i=0; i<$('.searchedCities').length; i++) {
        searchedCities.push($(`.searchedCities`)[i].text)
    }
    // will only pass this check if searched city hasn't been searched already. If so, update dom with data from previous search of that city
    if (searchedCities.includes($submittedCity)){
        updateDom($submittedCity);
        return;
    }
    // if searched city is empty, do nothing and clear search bar
    if (!$submittedCity) {
        $citySubmit.siblings(`input`).val(``);
        return;
    }
    // if all checks pass, retrieve coordinates of city
    getCord($submittedCity);
}

// this retrieves coordinates of a city given its name from GEOlocator API
function getCord(city) {
    let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=d707b8ed3b053f7a5311a05774362adc`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.length === 0) {
                alert("Please enter a valid city");
                return;
            }
            lat = data[0].lat;
            lon = data[0].lon;
            // retrieved coordinates of searched city now passed into weather api
            getWeather(lat, lon);
        });
}

// retrieve current and 5-day weather day from one call api
function getWeather(lattitude, longitude) {
    let requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lattitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=d707b8ed3b053f7a5311a05774362adc`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // get current date and all other weather info
            date = moment(data.current.dt, 'X').format('LL');
            temp = data.current.temp.toFixed(1);
            wind = data.current.wind_speed;
            humidity = data.current.humidity;
            uvIndex = data.current.uvi;
            iconURL = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
            // for loop will get data for 5 days and store in an array, hence 5 iterations
            for (i=0; i<5; i++) {
                dailyDate[i] = moment(data.daily[i+1].dt, 'X').format('LL');
                dailyTemp[i] = data.daily[i+1].temp.day.toFixed(1);
                dailyWind[i] = data.daily[i+1].wind_speed;
                dailyHumidity[i] = data.daily[i+1].humidity;
                dailyIconURL[i] = `https://openweathermap.org/img/wn/${data.daily[i+1].weather[0].icon}@2x.png`;
                console.log(dailyIconURL[i]);
            }
            // store all data in local storage with the key of the searched city
            localStorage.setItem($submittedCity, JSON.stringify({
                localCity: $submittedCity,
                localDate: date,
                localTemp: temp,
                localWind: wind,
                localHumidity: humidity,
                localUVIndex: uvIndex,
                localIconURL: iconURL,
                localDailyDate: dailyDate,
                localDailyTemp: dailyTemp,
                localDailyWind: dailyWind,
                localDailyHumidity: dailyHumidity,
                localDailyIconURL: dailyIconURL
            }))
            // add searched city in search history list and pass search city into update DOM function
            $(`#cityList`).append(`<a href="#" class="list-group-item list-group-item-action list-group-item-info searchedCities">${$submittedCity}</a>`);
            updateDom($submittedCity);
        });
}

// this function will update the dom according to the city passed into it
function updateDom(city) {
    // retrieve an object of all weather data with key of city in question. Should already be set in local storage beforehand
    currentCityInfo = JSON.parse(localStorage.getItem(city));
    date = currentCityInfo.localDate;
    temp = currentCityInfo.localTemp;
    wind = currentCityInfo.localWind;
    humidity = currentCityInfo.localHumidity;
    uvIndex = currentCityInfo.localUVIndex;
    iconURL = currentCityInfo.localIconURL;
    dailyDate = currentCityInfo.localDailyDate;
    dailyTemp = currentCityInfo.localDailyTemp;
    dailyWind = currentCityInfo.localDailyWind;
    dailyHumidity = currentCityInfo.localDailyHumidity;
    dailyIconURL = currentCityInfo.localDailyIconURL;
    //update jumbotron content
    $citySubmit.siblings(`input`).val(``);
    $(`#bigCityDisplay`).text(`${city} - ${date}`);
    $(`#bigCityDisplay`).append(`<img src='' id='bigIcon'>`);
    $(`#bigIcon`).attr(`src`, iconURL);
    $(`#bigTemp`).text(`Temperature: ${temp}°F`);
    $(`#bigWind`).text(`Wind Speed: ${wind} mph`);
    $(`#bigHumidity`).text(`Humidity: ${humidity}%`);
    $(`#bigUVI`).text(`UV Index: ${uvIndex}`);
    $(`#bigUVI`).css("font-weight", "bolder");
    if (uvIndex<2) {
        $(`#bigUVI`).css("color", "green");
    } else if (uvIndex<6) {
        $(`#bigUVI`).css("color", "yellow");
    } else {
        $(`#bigUVI`).css("color", "red");
    }
    // forecast cards updated in separate function for clarity
    addForecastCards();
}

// this function is called from the updateDOM function and adds or updates 5-day forecast
function addForecastCards() {
    $(`#forecastCardsList`).empty();
    for (i=0; i<5; i++) {
        $(`#forecastCardsList`).append(`
        <div class="card col-2 forecastCards my-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card- my-3">${dailyDate[i]}<img src='${dailyIconURL[i]}' id='smallIcon'></h5>
                <p class="card-text">Temp: ${dailyTemp[i]}°F</p>
                <hr class="my-4">
                <p class="card-text">Wind: ${dailyWind[i]} mph</p>
                <hr class="my-4">
                <p class="card-text">Humidity: ${dailyHumidity[i]}%</p>
                <hr class="my-4">
            </div>
        </div>`);
    }
}

//this function initializes the search history from local storage
function init() {
    if(localStorage.length===0) {
        return;
    }
    for (i=0; i<localStorage.length; i++) {
        $submittedCity = JSON.parse((localStorage.getItem(localStorage.key(i)))).localCity;
        $(`#cityList`).append(`<a href="#" class="list-group-item list-group-item-action list-group-item-info searchedCities">${$submittedCity}</a>`);
    }
}

// on click of submit button, call submithandler function
$citySubmit.on(`click`, citySubmitHandler);

// on click of one of the searched cities in history, updateDOM with 
$(`#cityList`).on(`click`, `.searchedCities`, function() {
    $submittedCity = $(this).text();
    updateDom($submittedCity);
})

//clears search history and updates dom accordingly on click
$(`#clearSearch`).on(`click`, function() {
    $(`#cityList`).empty();
    $(`#forecastCardsList`).empty();
    localStorage.clear();
    init();
    $(`#bigCityDisplay`).text(`Enter a City to Begin`);
    $(`#bigIcon`).attr(`src`, ``);
    $(`#bigTemp`).text(`Temperature: `);
    $(`#bigWind`).text(`Wind Speed: `);
    $(`#bigHumidity`).text(`Humidity: `);
    $(`#bigUVI`).text(`UV Index: `);
    $(`#bigUVI`).css("font-weight", "300");
    $(`#bigUVI`).css("color", "#212529");
})

//run init on page load
init();