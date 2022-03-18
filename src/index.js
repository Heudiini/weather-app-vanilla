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

function ForecastdayDisplay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getforecast(coordinates) {
  console.log(coordinates);
  let apiKey = "cf35cd803ef0202f5f034abcff722764";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//// show all the data requested on page according location wanted
function weatherMain(response) {
  //console.log(response.data);

  celsius = Math.round(response.data.main.temp);

  document.querySelector("#theTown").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = celsius;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.temp);
  //document.querySelector("#tonight-temp").innerHTML = Math.round(response.data.main.temp);

  //icon change , icon data from openweather api
  let iconForCurrent = document.querySelector("#icon");
  iconForCurrent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconForCurrent.setAttribute("alt", response.data.weather[0].description);

  getforecast(response.data.coord);
}

//collect the data by submitted city input and sent forwards to weather main
function searchTown(city) {
  let apiKey = "cf35cd803ef0202f5f034abcff722764";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherMain);
}
////search input value is sent to search town function
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

// convert temperature functions:
// ps. prevent default is to tell code that its un necessary to open browser
//as we have <a> links involved for temperature convertions

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", toCelsius);

let fahLink = document.querySelector("#fah");
fahLink.addEventListener("click", convertToFahrenheit);
/////

///////////fahrenheit//

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = (celsius * 9) / 5 + 32;
  let degrees = document.querySelector("#temperature");
  /////remove active class of celcius each time clicked fahrenheit and vice versa
  celLink.classList.remove("active");
  fahLink.classList.add("active");
  degrees.innerHTML = Math.round(fahrenheit);
}

//////celcius//////////
function toCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#temperature");
  celLink.classList.add("active");
  fahLink.classList.remove("active");
  degrees.innerHTML = celsius;
}

//
let celsius = null;
let currentTime = new Date();

let time = document.querySelector("#current-time");
time.innerHTML = showTime(currentTime);

let form = document.querySelector("#theForm");
form.addEventListener("submit", takeSubmitValue);

//// from current button press we proceed to pinmylocation function up
let currentBtn = document.querySelector("#locationBtn");
currentBtn.addEventListener("click", pinMyLocation);

/////injecting html into js so we can display forecast

///receiving response from daily api
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="column">`;
  forecast.forEach(function (forecastDay, index) {
    ///concatenating
    if (index != 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
  <div class="card-body card  ">
                <h5 class=" row card-title forecast-day ">${ForecastdayDisplay(forecastDay.dt)} 
                   </h5>  
               
                 <h5 class="row"> <div> <img src= "http://openweathermap.org/img/wn/${
                   forecastDay.weather[0].icon
                 }@2x.png" <div></h5>
                 <div class=" row card-text weather-forecast-temperatures">
                          <span class="forecast-max">${Math.round(
                            forecastDay.temp.max
                          )}<span>°max</span></span>
                          <span class="forecast-min">${Math.round(
                            forecastDay.temp.min
                          )}<span>°min</span></span>
                         
                    </div>
          </div>
  `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
  //console.log(forecastHtml);
}

///default point city:

searchTown("Santa Cruz de Tenerife");
displayForecast();
