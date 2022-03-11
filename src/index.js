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

//// show all the data requested on page according location wanted
function weatherMain(response) {
  document.querySelector("#theTown").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#tonight-temp").innerHTML = Math.round(response.data.main.temp);
}
//collect the data by submitted city input and sent forwards to weather main
function searchTown(city) {
  let apiKey = "cf35cd803ef0202f5f034abcff722764";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherMain);
}
////seatch input value is sent to search town function
function takeSubmitValue(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchTown(city);
}
//// collect the data needed for the weathermain function
function changeToMyLocation(position) {
  let apiKey = "cf35cd803ef0202f5f034abcff722764";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherMain);
}
///take geolocation data, and proceed to change mytomyloc function
function pinMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(changeToMyLocation);
}

//functions to convert :
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

let time = document.querySelector("#current-time");
let currentTime = new Date();
time.innerHTML = showTime(currentTime);

let form = document.querySelector("#theForm");
form.addEventListener("submit", takeSubmitValue);

//// from current button press we proceed to pinmylocation function up
let currentBtn = document.querySelector("#locationBtn");
currentBtn.addEventListener("click", pinMyLocation);

///default point city:

searchTown("helsinki");
