////////////////////current time/////////////////////day////////////
function showTime() {
  var d = new Date();
  let hour = d.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = d.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let day = d.getDay();
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentday = weekdays[day];
  let aika = document.querySelector("#current-time");
  aika.innerHTML = `  ${currentday} ${hour}:${minute}`;
}
showTime();

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

function changeTemp(response) {
  let changeTemp = document.querySelector("#temperature");
  changeTemp.innerHTML = Math.round(response.data.main.temp);
  let humidData = Math.round(response.data.main.humidity) + "%";
  let getHumid = document.querySelector(".humidity");
  getHumid.innerHTML = `Humidity ${humidData}`;
  let getWind = document.querySelector(".wind");
  let winddata = Math.round(response.data.wind.speed);
  getWind.innerHTML = `Wind ${winddata} m/s`;
  let desc = response.data.weather[0].description;
  let currDescription = document.querySelector("#description");
  currDescription.innerHTML = `${desc}`;

  console.log(response.data.wind.speed);
}

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

function pinMyLocation(response) {
  console.log(response);
  let myLoc = document.querySelector("#theTown");
  myLoc.innerHTML = `${response.data.name}`;
  let tempMyLoc = document.querySelector("#temperature");
  tempMyLoc.innerHTML = Math.round(response.data.main.temp);

  let desc = response.data.weather[0].description;
  let currDescription = document.querySelector("#description");
  currDescription.innerHTML = `${desc}`;
}

function changeToMyLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "cf35cd803ef0202f5f034abcff722764";
  let urlMyLocation = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(urlMyLocation).then(pinMyLocation);
  console.log("toimii?");
}

function intermediateMyLoc() {
  navigator.geolocation.getCurrentPosition(changeToMyLocation);
}

let clickMyLocationButton = document.querySelector("#locationBtn");
clickMyLocationButton.addEventListener("click", intermediateMyLoc);
