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

let apiKey = "0d863e0f3f7819cc1dc71c86924341c5";
let apiRoot = "https://api.openweathermap.org/data/2.5";

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

function formatHour(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}h${minutes}`;
}

function refreshWeather(response) {
  place.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  getTemperature.innerHTML = `${Math.round(response.data.main.temp)}º`;
  sunriseHour.innerHTML =
    "Sunrise:" + " " + formatHour(new Date(response.data.sys.sunrise * 1000));
  sunsetHour.innerHTML =
    "Sunset:" + " " + formatHour(new Date(response.data.sys.sunset * 1000));
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${response.data.wind.speed} km/H`;
  description.innerHTML = `${response.data.weather[0].description}`;
  currentDate.innerHTML = formatDate(new Date(response.data.dt * 1000));
  currentHour.innerHTML = formatHour(new Date(response.data.dt * 1000));
}

function search(city) {
  let apiUrl = `${apiRoot}/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#input-value");
  if (inputValue.value.length > 0) {
    search(inputValue.value);
  } else {
    alert("Please enter a city");
  }
}

function searchPosition(position) {
  let apiUrl = `${apiRoot}/weather?lat=${position.coords.latitude}&lon=${
    position.coords.longitude
  }&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

input.addEventListener("submit", handleSearch);
currentLocationButton.addEventListener("click", buttonClick);

search("Basel");
