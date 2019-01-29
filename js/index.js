const cidade = 'Castelo Branco';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + ',pt&appid=74ceb3b2518f00e1284ce45255274e36&units=metric&lang=pt';

//Get HTML elements
const cityNameEl = document.querySelector(".cityName");
const iconEl = document.querySelector("img");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".description");

//Fetch OpenWeatherMap API
fetch(API_URL)
  .then(response => response.json())
  .then(result => {
    console.log(result);
    tempEl.textContent = Math.ceil(result.main.temp * 10) /10 + ("ºC");
    cityNameEl.textContent = result.name;
    descEl.textContent = result.weather[0].description;
    iconEl.src = ("chrome-extension://fliffphbmddklhlnjlejgglgbofacjec/assets/icons/" + result.weather[0].icon + ".png");
  });

//Get Date and Time
const time = new Date();
const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const semana = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();

let greeting = "";
if(hour >= 4 && hour < 12) {
  greeting = "Bom dia, Diogo.";
} 
else if(hour >= 12 && hour < 18) {
  greeting = "Boa tarde, Diogo.";
}
else if(hour >= 18 && hour < 20) {
  greeting = "Boa noite, Diogo.";
}
else {
  greeting = "Boa noite, Diogo.";
}

//Insert greeting
const greetingEl = document.querySelector(".greeting");
greetingEl.textContent = greeting;

//Insert Date and Time to the DOM
if(hour < 9) {
  hour = ("0" + hour);
}
if(minutes < 9) {
  minutes = ("0" + minutes);
}
const timeElement = document.querySelector(".date");
timeElement.textContent = (semana + ", " + hour + ":" + minutes);
