const cidade = 'Castelo Branco';
const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + ',pt&appid=74ceb3b2518f00e1284ce45255274e36&units=metric&lang=pt';

//Get HTML elements
const containerEl = document.querySelector(".container");
const settingsPage = document.querySelector(".settings-page");
const cityNameEl = document.querySelector(".location-text");
const iconEl = document.querySelector(".weather-icon");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".weather-info");
const loader = document.querySelector(".loader-wrapper");
const settingsIcon = document.querySelector(".settings-icon");

settingsIcon.onclick = function() {
  containerEl.classList.add('animated', 'flipOutY');
  setTimeout(function() {
    settingsPage.classList.add('animated', 'flipInY');
    settingsPage.style.display = "flex";
  }, 710);
}

//Fetch OpenWeatherMap API
async function fetchWeatherAPI() {
  loader.style.display = "block";
  let apiData = await fetch(weatherAPI);
  apiData = await apiData.json();
  //Insert data into the DOM
  tempEl.textContent = await Math.round(apiData.main.temp) + ("º");
  cityNameEl.textContent = await apiData.name;
  descEl.textContent = await apiData.weather[0].description;
  iconEl.style.backgroundImage = await "url('chrome-extension://fliffphbmddklhlnjlejgglgbofacjec/assets/icons/" + apiData.weather[0].icon + ".png')";
  loader.style.display = "none";
  await inserDate();
}

//Get Date and Time
function inserDate() {
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
}

fetchWeatherAPI();
