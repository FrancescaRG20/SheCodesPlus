// Definition of variables
let place = document.querySelector("h2");
let getTemperature = document.querySelector(".getTemperature");
let sunriseHour = document.querySelector(".sunriseHour");
let sunsetHour = document.querySelector(".sunsetHour");
let currentHumidity = document.querySelector(".currentHumidity");
let currentWindSpeed = document.querySelector(".currentWindSpeed");
let description = document.querySelector(".weatherDescription");
let currentDate = document.querySelector(".currentDate");
let currentHour = document.querySelector(".currentHour");
let input = document.querySelector("#location");
let currentLocationButton = document.querySelector("#current-location");
let icon = document.querySelector("#weather-icon");
let apiKey = "0d863e0f3f7819cc1dc71c86924341c5";
let apiRoot = "https://api.openweathermap.org/data/2.5";

// function to format the date
function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let monthNames = [
    "January",
    "February",
    "Marc",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = weekDays[date.getDay()];
  let month = monthNames[date.getMonth()];
  let numberDay = date.getDate();
  let year = date.getFullYear();
  return `${day}, ${month} ${numberDay} ${year}`;
}

// function to format the hour
function formatHour(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 1) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}h${minutes}`;
}

// function to formate the date of the forecasts
function formatDateForecasts(date) {
  let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let day = weekDays[date.getDay()];
  return `${day} ${formatHour(date)}`;
}

// function to display the weather data for current day
function refreshWeather(response) {
  let iconUrl = `http://openweathermap.org/img/w/${
    response.data.weather[0].icon
  }.png`;
  place.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  getTemperature.innerHTML = `${Math.round(response.data.main.temp)}\xB0`;
  sunriseHour.innerHTML =
    "Sunrise:" + " " + formatHour(new Date(response.data.sys.sunrise * 1000));
  sunsetHour.innerHTML =
    "Sunset:" + " " + formatHour(new Date(response.data.sys.sunset * 1000));
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  description.innerHTML = `${response.data.weather[0].description}`;
  currentDate.innerHTML = formatDate(new Date(response.data.dt * 1000));
  currentHour.innerHTML = formatHour(new Date(response.data.dt * 1000));
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", response.data.weather[0].description);
}

// function to display forectats weather data
function refreshForecasts(response) {
  document.querySelectorAll(".card-body").forEach(function(element, index) {
    let day = new Date(response.data.list[index].dt_txt);
    element.querySelector(".card-title").innerHTML = formatDateForecasts(day);
    element.querySelector(".card-text").innerHTML = `${Math.round(
      response.data.list[index].main.temp_max
    )}\xB0`;
    element
      .querySelector(".day__block-image")
      .setAttribute(
        "src",
        "http://openweathermap.org/img/w/" +
          response.data.list[index].weather[0].icon +
          ".png"
      );
  });
}

// function to call the API
function search(city) {
  let apiUrl = `${apiRoot}/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
  let apiUrlForecasts = `${apiRoot}/forecast/?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecasts).then(refreshForecasts);
}

// function to obtain user's input
function handleSearch(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#input-value");
  if (inputValue.value.length > 0) {
    search(inputValue.value);
  } else {
    alert("Please enter a city");
  }
}

// function to obtain user's current location
function searchPosition(position) {
  let apiUrl = `${apiRoot}/weather?lat=${position.coords.latitude}&lon=${
    position.coords.longitude
  }&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
  let apiUrlForecasts = `${apiRoot}/forecast?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecasts).then(refreshForecasts);
}

// function to call the current location when clicking on the button
function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

input.addEventListener("submit", handleSearch);
currentLocationButton.addEventListener("click", buttonClick);

// function that still doesn't work to change background color
function changeBackground(response) {
  description = `${response.data.weather[0].description}`;
  color = "grey";
  if (description !== "clear sky") {
    document.container.style.backgroundColor = color;
  }
}
window.addEventListener("click", changeBackground);

search("Praia de Mira");
