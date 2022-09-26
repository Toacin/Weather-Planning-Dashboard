console.log("linked");

$citySubmit = $(`#searchButton`)

function citySubmitHandler() {
    if (!$citySubmit.siblings(`input`).val().trim()) {
        $citySubmit.siblings(`input`).val(``);
        return;
    }
    $submittedCity = $citySubmit.siblings(`input`).val();
    console.log($submittedCity);
    $citySubmit.siblings(`input`).val(``);
    $(`#cityList`).append(`<a href="#" class="list-group-item list-group-item-action list-group-item-info">${$submittedCity}</a>`);
    $(`#bigCityDisplay`).text(`${$submittedCity}`);
    addForecastCards();
}

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
    console.log(index);
}

$citySubmit.on(`click`, citySubmitHandler);