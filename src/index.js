////////////////////current time/////////////////////day////////////
function showTime(d) {
  let hour = d.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = d.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let dayIndex = d.getDay();
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = weekdays[dayIndex];

  return `${day} ${hour}:${minute}`;
}
let time = document.querySelector("#current-time");
let currentTime = new Date();
time.innerHTML = showTime(currentTime);

//functions to convert celsius and fahrenheit:
///////////fahrenheit//////
function toFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = 66;
}

let f = document.querySelector("#fah");
f.addEventListener("click", toFahrenheit);

//////celcius//////////
function toCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = 19;
}

let c = document.querySelector("#cel");
c.addEventListener("click", toCelsius);

//////////////// main functions change information by search ///////////////////////////////////

function changeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector("#theTown");
  city.innerHTML = searchInput.value;
  let apiKey = `01a738ffcc406d9b10304ab407495deb`;
  let urlLocation = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(urlLocation).then(changeTemp);
}

let form = document.querySelector("#theForm");
form.addEventListener("submit", changeCity);

// use current location pin ///// works ok dont touch

function weatherMain(response) {
  //console.log(response);
  document.querySelector("#theTown").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function StartPointCity(city) {
  let apiKey = "cf35cd803ef0202f5f034abcff722764";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherMain);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#theTown").value;
  StartPointCity(city);
}

function changeToMyLocation(position) {
  let apiKey = "cf35cd803ef0202f5f034abcff722764";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherMain);
}

function intermediateMyLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(changeToMyLocation);
}

let clickMyLocationButton = document.querySelector("#locationBtn");
clickMyLocationButton.addEventListener("click", intermediateMyLoc);
StartPointCity("Helsinki");
