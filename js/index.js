const cidade = 'Castelo Branco';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + ',pt&appid=74ceb3b2518f00e1284ce45255274e36&units=metric&lang=pt';

//Fetch OpenWeatherMap API
fetch(API_URL)
  .then(response => response.json())
  .then(result => {
    const tmp = Math.ceil(result.main.temp);
    const cityName = result.name;
    const weatherDescription = result.weather[0].description;
    const icon = result.weather[0].icon;
  });

//Get Date and Time
const time = new Date();
const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const semana = days[time.getDay()];
const hour = time.getHours();
const minutes = time.getMinutes();

//Insert Date and Time to the DOM
const timeElement = document.querySelector(".time");
timeElement.textContent = (semana + ", " + hour + ":" + minutes);