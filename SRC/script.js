function showForecastDay(timestamp) {
  let dt = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[dt.getDay()];
  return `${day}`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast-element");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `<div class="col-2">
          <h5>${showForecastDay(forecast.dt * 1000)}</h5>
          <img class= "forecast-icon" src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" alt="" />
          <span class="forecast-temp">
            <strong>${Math.round(
              forecast.temp.max
            )}°</strong><small>/${Math.round(forecast.temp.min)}°</small>
          </span>
        </div>`;
  }
}

function showCurrentTemp(response) {
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temp-display");
  tempDisplay.innerHTML = `${currentTemp}°F`;
  let windDisplay = document.querySelector("#current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  windDisplay.innerHTML = `${currentWind}mph`;
  let descriptionDisplay = document.querySelector("#current-description");
  let currentDescription = response.data.weather[0].description;
  descriptionDisplay.innerHTML = currentDescription;
  let humidityDisplay = document.querySelector("#current-humidity");
  let currentHumidity = response.data.main.humidity;
  humidityDisplay.innerHTML = currentHumidity;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let lat = response.data.coord.lat;
  let long = response.data.coord.lon;
  let apiKey = `35752ea57c3f31dae01153f9ca0e9ecf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
exclude={hourly, minutely, current}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function getCurrentTemp() {
  let cityInput = document.querySelector("#city-name").innerHTML;
  let apiKey = `35752ea57c3f31dae01153f9ca0e9ecf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function search(city) {
  let apiKey = `35752ea57c3f31dae01153f9ca0e9ecf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name");
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = cityInput.value;
  getCurrentTemp();
}

let enterCity = document.querySelector("#city-search");
enterCity.addEventListener("submit", showCity);

function formatDate(today) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[today.getDay()];
  let month = months[today.getMonth()];
  let date = today.getDate();
  let year = today.getFullYear();
  let time = new Date();

  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = document.querySelector("h4");
  currentDate.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minutes}`;
}
let now = new Date();
formatDate(now);

function showCelsius(response) {
  let celsiusDisplay = document.querySelector("#temp-display");
  let celsiusTemp = Math.round(response.data.main.temp);
  celsiusDisplay.innerHTML = `${celsiusTemp}°C`;
  let windDisplay = document.querySelector("#current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  windDisplay.innerHTML = `${currentWind}km/h`;
  let lat = response.data.coord.lat;
  let long = response.data.coord.lon;
  let apiKey = `35752ea57c3f31dae01153f9ca0e9ecf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
exclude={hourly, minutely, current}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getCelsius() {
  let cityInput = document.querySelector("#city-name").innerHTML;
  let apiKey = `35752ea57c3f31dae01153f9ca0e9ecf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCelsius);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", getCelsius);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", getCurrentTemp);

function showCurrentLocation(response) {
  console.log(response);
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temp-display");
  tempDisplay.innerHTML = `${currentTemp}°F`;
  let windDisplay = document.querySelector("#current-wind");
  let currentWind = Math.round(response.data.wind.speed);
  windDisplay.innerHTML = `${currentWind}mph`;
  let descriptionDisplay = document.querySelector("#current-description");
  let currentDescription = response.data.weather[0].description;
  descriptionDisplay.innerHTML = currentDescription;
  let humidityDisplay = document.querySelector("#current-humidity");
  let currentHumidity = response.data.main.humidity;
  humidityDisplay.innerHTML = currentHumidity;
  let lat = response.data.coord.lat;
  let long = response.data.coord.lon;
  let apiKey = `35752ea57c3f31dae01153f9ca0e9ecf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
exclude={hourly, minutely, current}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function findCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `35752ea57c3f31dae01153f9ca0e9ecf`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

search("New York");
