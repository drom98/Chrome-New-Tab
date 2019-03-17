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
const backButton = document.querySelector(".back-icon");

settingsIcon.onclick = function() {
  settingsPage.classList.add('animated', 'fadeInLeft');
  settingsPage.style.display = "flex";
}

backButton.onclick = function() {
  settingsPage.classList.remove('animated', 'fadeInLeft');
  settingsPage.classList.add('animated', 'fadeOutLeft');
  setTimeout(function() {
    settingsPage.style.display = "none";
    settingsPage.classList.remove('animated', 'fadeOutLeft');
  }, 1000);
}

function renderUI(apiData) {
  //Insert data into the DOM
  tempEl.textContent = Math.round(apiData.main.temp) + ("º");
  cityNameEl.textContent = apiData.name;
  descEl.textContent = apiData.weather[0].description;
  iconEl.style.backgroundImage = "url('chrome-extension://fliffphbmddklhlnjlejgglgbofacjec/assets/icons/" + apiData.weather[0].icon + ".png')";
  loader.style.display = "none";
}

//Fetch OpenWeatherMap API
async function fetchWeatherAPI() {
  loader.style.display = "block";
  let apiData = await fetch(weatherAPI);
  apiData = await apiData.json();
  await renderUI(apiData);
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
