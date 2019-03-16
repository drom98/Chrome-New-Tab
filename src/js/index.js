const cidade = 'Castelo Branco';
const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + ',pt&appid=74ceb3b2518f00e1284ce45255274e36&units=metric&lang=pt';

//Get HTML elements
const cityNameEl = document.querySelector(".location-text");
const iconEl = document.querySelector(".weather-icon");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".weather-info");

//Fetch OpenWeatherMap API
fetch(weatherAPI)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    tempEl.textContent = Math.round(result.main.temp) + ("º");
    //tempEl.textContent = Math.ceil(result.main.temp * 10) /10 + ("ºC");
    cityNameEl.textContent = result.name;
    descEl.textContent = result.weather[0].description;
    iconEl.style.backgroundImage = "url('chrome-extension://fliffphbmddklhlnjlejgglgbofacjec/assets/icons/" + result.weather[0].icon + ".png')";
    //iconEl.src = ("chrome-extension://fliffphbmddklhlnjlejgglgbofacjec/assets/icons/" + result.weather[0].icon + ".png");
  });

//Get Date and Time
const time = new Date();
const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const semana = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();

//Insert Date and Time to the DOM
if(hour < 9) {
  hour = ("0" + hour);
}
if(minutes < 9) {
  minutes = ("0" + minutes);
}
const timeElement = document.querySelector(".week-day");
timeElement.textContent = (semana + ", " + hour + ":" + minutes);
