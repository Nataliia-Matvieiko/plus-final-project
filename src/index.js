function formatTime(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }
    return `${day} ${hour}:${minute}`;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = formatTime(new Date());

function displayWeather(response) {
    console.log("displayWeather", response);
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

    let currentDescription = document.querySelector("#description");
    currentDescription.innerHTML = `${response.data.weather[0].main}`;

    let currentTemperature = document.querySelector(
        "#temperature-container .temperature"
    );
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;

    let currentIcon = document.querySelector("#temperature-container .main-icon")
    currentIcon.src = `images/forecast-icons/${response.data.weather[0].icon}.png`

    let currentHumidity = document.querySelector("#current-humidity");
    currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

    let currentWind = document.querySelector("#current-wind");
    currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

    getForecast(response.data.coord);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDay()
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return days[day];
};

function displayForecast(response) {
    console.log("displayForecast", response)
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = ``;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
      <div class="forecast-day">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="images/forecast-icons/${forecastDay.weather[0].icon}.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°/</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
        }
    });

    forecastHTML = forecastHTML + ``;
    forecastElement.innerHTML = forecastHTML;
}

let apiKey = "c1927e1ed9f92e3ca4b232753a36e5df";

function queryWeatherByCityName(city) {
    console.log(city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url).then(displayWeather);
}

function searchCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = cityInput.value;
    queryWeatherByCityName(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

document
    .querySelector("div.cities .dnipro")
    .addEventListener("click", function () {
        queryWeatherByCityName("dnipro");
    });

document
    .querySelector("div.cities .kharkiv")
    .addEventListener("click", function () {
        queryWeatherByCityName("kharkiv");
    });

document
    .querySelector("div.cities .odesa")
    .addEventListener("click", function () {
        queryWeatherByCityName("odesa");
    });

document
    .querySelector("div.cities .lviv")
    .addEventListener("click", function () {
        queryWeatherByCityName("lviv");
    });

document
    .querySelector("div.cities .kyiv")
    .addEventListener("click", function () {
        queryWeatherByCityName("kyiv");
    });

document
    .querySelector("div.cities .zaporizhzhia")
    .addEventListener("click", function () {
        queryWeatherByCityName("zaporizhzhia");
    });

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "be81f193e065bf5feb2d944c7336968b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}

function showCurrentLocation(event) {
    event?.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showCurrentLocation);

// queryWeatherByCityName("Berdiansk");
showCurrentLocation()