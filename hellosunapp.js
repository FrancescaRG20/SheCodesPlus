let h2 = document.querySelector("h2");
let getTemperature = document.querySelector(".getTemperature");
let sunriseHour = document.querySelector(".sunriseHour");
let sunsetHour = document.querySelector(".sunsetHour");
let currentHumidity = document.querySelector(".currentHumidity");
let currentWindSpeed = document.querySelector(".currentWindSpeed");
let date = new Date();
let city = "Lisbon";

let apiKey = "0d863e0f3f7819cc1dc71c86924341c5";
let apiRoot = "https://api.openweathermap.org/data/2.5";

function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
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
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = document.querySelector(".currentDate");
  let currentHour = document.querySelector(".currentHour");
  currentDate.innerHTML = `${day}, ${month} ${date.getDate()}, ${date.getFullYear()}`;
  currentHour.innerHTML = `${date.getHours()}h${minutes}`;
}

function refreshWeather(response) {
  event.preventDefault();
  let apiPath = `/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiRoot}/${apiPath}`).then(function(response) {
    h2.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    getTemperature.innerHTML = `${Math.round(response.data.main.temp)}º`;
    sunriseHour.innerHTML = `Sunrise: ${response.data.sys.sunrise}`;
    sunsetHour.innerHTML = `Sunset: ${response.data.sys.sunset}`;
    currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    currentWindSpeed.innerHTML = `Wind: ${response.data.wind.speed} km/H`;
  });
}

function search(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#input-value");
  let apiPath = `/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  axios.get(`${apiRoot}/${apiPath}`).then(refreshWeather);
  h2.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
}
let input = document.querySelector("form");
input.addEventListener("submit", search);

navigator.geolocation.getCurrentPosition(function(position) {
  let apiPath = `/weather?lat=${position.coords.latitude}&lon=${
    position.coords.longitude
  }&appid=${apiKey}&units=metric`;
});
