$citySubmit = $(`#searchButton`);
let date = '';
let temp = '';
let wind = '';
let humidity = '';
let uvIndex = '';
let dailyDate = [];
let dailyTemp = [];
let dailyWind = [];
let dailyHumidity = [];
let $submittedCity = '';

function citySubmitHandler() {
    if (!$citySubmit.siblings(`input`).val().trim()) {
        $citySubmit.siblings(`input`).val(``);
        return;
    }
    $submittedCity = $citySubmit.siblings(`input`).val().trim();
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
            console.log(data);
            date = moment(data.current.dt, 'X').format('LL');
            temp = data.current.temp.toFixed(1);
            wind = data.current.wind_speed;
            humidity = data.current.humidity;
            uvIndex = data.current.uvi;
            for (i=0; i<5; i++) {
                dailyDate[i] = moment(data.daily[i+1].dt, 'X').format('LL');
                dailyTemp[i] = data.daily[i+1].temp.day.toFixed(1);
                dailyWind[i] = data.daily[i+1].wind_speed;
                dailyHumidity[i] = data.daily[i+1].humidity;
            }
            localStorage.setItem($submittedCity, JSON.stringify({
                localDate: date,
                localTemp: temp,
                localWind: wind,
                localHumidity: humidity,
                localUVIndex: uvIndex,
                localDailyDate: dailyDate,
                localDailyTemp: dailyTemp,
                localDailyWind: dailyWind,
                localDailyHumidity: dailyHumidity
            }))
            updateDom($submittedCity);
        });
}

// this function will update the dom
function updateDom(city) {
    currentCityInfo = JSON.parse(localStorage.getItem(city));
    date = currentCityInfo.localDate;
    temp = currentCityInfo.localTemp;
    wind = currentCityInfo.localWind;
    humidity = currentCityInfo.localHumidity;
    uvIndex = currentCityInfo.localUVIndex;
    dailyDate = currentCityInfo.localDailyDate;
    dailyTemp = currentCityInfo.localDailyTemp;
    dailyWind = currentCityInfo.localDailyWind;
    dailyHumidity = currentCityInfo.localDailyHumidity;
    $citySubmit.siblings(`input`).val(``);
    $(`#bigCityDisplay`).text(`${city} - ${date}`);
    $(`#bigTemp`).text(`Temperature: ${temp}°F`);
    $(`#bigWind`).text(`Wind Speed: ${wind} mph`);
    $(`#bigHumidity`).text(`Humidity: ${humidity}%`);
    $(`#bigUVI`).text(`UV Index: ${uvIndex}`);
    $(`#bigUVI`).css("font-weight", "bolder");
    if (uvIndex<2) {
        $(`#bigUVI`).css("color", "green");
    } else if (uvIndex<6) {
        $(`#bigUVI`).css("color", "grey");
    } else {
        $(`#bigUVI`).css("color", "red");
    }
    $(`#cityList`).append(`<a href="#" class="list-group-item list-group-item-action list-group-item-info">${$submittedCity}</a>`);
    addForecastCards();
}

function addForecastCards() {
    $(`#forecastCardsList`).empty();
    for (i=0; i<5; i++) {
        $(`#forecastCardsList`).append(`
        <div class="card col-2 forecastCards my-2 forecastCardItem" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card- my-3">${dailyDate[i]}</h5>
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

$citySubmit.on(`click`, citySubmitHandler);

