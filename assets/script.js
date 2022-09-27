$citySubmit = $(`#searchButton`);
dailyDate = [];
dailyTemp = [];
dailyWind = [];
dailyHumidity = [];

function citySubmitHandler() {
    if (!$citySubmit.siblings(`input`).val().trim()) {
        $citySubmit.siblings(`input`).val(``);
        return;
    }
    $submittedCity = $citySubmit.siblings(`input`).val();
    getCord($submittedCity.trim());
    $citySubmit.siblings(`input`).val(``);
    $(`#cityList`).append(`<a href="#" class="list-group-item list-group-item-action list-group-item-info">${$submittedCity}</a>`);
    $(`#bigCityDisplay`).text(`${$submittedCity}`);
    addForecastCards();
}

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

function getWeather(lattitude, longitude) {
    let requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lattitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=d707b8ed3b053f7a5311a05774362adc`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            date = moment(data.current.dt, 'X').format('LL');
            temp = data.current.temp;
            wind = data.current.wind_speed;
            humidity = data.current.humidity;
            uvIndex = data.current.uvi;
            console.log(date);
            console.log(temp.toFixed(1) +'° F');
            console.log(wind + ' mph');
            console.log(humidity + ' %');
            console.log(uvIndex);
            for (i=0; i<5; i++) {
                dailyDate[i] = moment(data.daily[i+1].dt, 'X').format('LL');
                dailyTemp[i] = data.daily[i+1].temp.day.toFixed(1);
                dailyWind[i] = data.daily[i+1].wind_speed;
                dailyHumidity[i] = data.daily[i+1].humidity;
                console.log(dailyDate[i]);
                console.log(dailyTemp[i] +'° F');
                console.log(dailyWind[i] + ' mph');
                console.log(dailyHumidity[i] + ' %');
            }
            // updateDOM();
            console.log(dailyTemp[3]);
        });
}

// function updateDom() {

// }

index=0;
function addForecastCards() {
    $(`#forecastCardsList`).empty();
    $(`#forecastCardsList`).append(`
    <div class="card col-2 forecastCards my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card- my-3">${index}</h5>
            <p class="card-text">Temp: </p>
            <hr class="my-4">
            <p class="card-text">Wind: </p>
            <hr class="my-4">
            <p class="card-text">Humidity: </p>
            <hr class="my-4">
        </div>
    </div>
    <div class="card col-2 forecastCards my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card- my-3">${index}</h5>
            <p class="card-text">Temp: </p>
            <hr class="my-4">
            <p class="card-text">Wind: </p>
            <hr class="my-4">
            <p class="card-text">Humidity: </p>
            <hr class="my-4">
        </div>
    </div>
    <div class="card col-2 forecastCards my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card- my-3">${index}</h5>
            <p class="card-text">Temp: </p>
            <hr class="my-4">
            <p class="card-text">Wind: </p>
            <hr class="my-4">
            <p class="card-text">Humidity: </p>
            <hr class="my-4">
        </div>
    </div>
    <div class="card col-2 forecastCards my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card- my-3">${index}</h5>
            <p class="card-text">Temp: </p>
            <hr class="my-4">
            <p class="card-text">Wind: </p>
            <hr class="my-4">
            <p class="card-text">Humidity: </p>
            <hr class="my-4">
        </div>
    </div>
    <div class="card col-2 forecastCards my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card- my-3">${index}</h5>
            <p class="card-text">Temp: </p>
            <hr class="my-4">
            <p class="card-text">Wind: </p>
            <hr class="my-4">
            <p class="card-text">Humidity: </p>
            <hr class="my-4">
        </div>
    </div>`);
    index = index+1;
}

$citySubmit.on(`click`, citySubmitHandler);