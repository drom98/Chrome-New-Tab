const cityName = 'Castelo Branco';
const lang = 'pt';
const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',pt&appid=74ceb3b2518f00e1284ce45255274e36&units=metric&lang=' + lang;

//Get HTML elements
const bodyEl = document.querySelector("body");
const containerEl = document.querySelector(".container");
const settingsPage = document.querySelector(".settings-page");
const cityNameEl = document.querySelector(".location-text");
const iconEl = document.querySelector(".weather-icon");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".weather-info");
const loader = document.querySelector(".loader-wrapper");
const settingsIcon = document.querySelector(".settings-icon");
const backButton = document.querySelector(".back-icon");

async function setBackground() {
  bodyEl.style.backgroundColor = "#262626";
  const time = new Date();
  const hour = time.getHours();

  const mBg01 = "../assets/backgrounds/morning/01.jpg";
  const mBg02 = "../assets/backgrounds/morning/02.jpg";
  const aftBg01 = "../assets/backgrounds/afternoon/01.jpg";
  const aftBg02 = "../assets/backgrounds/afternoon/02.jpg";
  const nightBg01 = "../assets/backgrounds/night/01.jpg";
  const nightBg02 = "../assets/backgrounds/night/02.jpg";
  const nightBg03 = "../assets/backgrounds/night/03.jpg";
  const morningBg = [mBg01, mBg02];
  const afternoonBg = [aftBg01, aftBg02];
  const nightBg = [nightBg01, nightBg02, nightBg03];

  if(hour > 19) {
    const randomBg = await nightBg[Math.floor(Math.random()*nightBg.length)];
    bodyEl.style.backgroundImage = await `url('${randomBg}')`;
    bodyEl.classList.add('animated', 'fadeIn');
  }
  else if(hour >= 12) {
    //Afternoon
    const randomBg = await afternoonBg[Math.floor(Math.random()*nightBg.length)];
    bodyEl.style.backgroundImage = await `url('${randomBg}')`;
    bodyEl.classList.add('animated', 'fadeIn');
  }
  else if(hour > 0) {
    //Morning
    const randomBg = await morningBg[Math.floor(Math.random()*nightBg.length)];
    bodyEl.style.backgroundImage = await `url('${randomBg}')`;
    bodyEl.classList.add('animated', 'fadeIn');
  }
}

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
  containerEl.style.display = "flex";
  containerEl.classList.add('animated', 'fadeIn');
  //Insert data into the DOM
  tempEl.textContent = Math.round(apiData.main.temp) + ("º");
  cityNameEl.textContent = apiData.name;
  descEl.textContent = apiData.weather[0].description;
  iconEl.style.backgroundImage = "url('chrome-extension://fliffphbmddklhlnjlejgglgbofacjec/assets/icons/" + apiData.weather[0].icon + ".png')";
}

//Fetch OpenWeatherMap API
async function fetchWeatherAPI() {
  let apiData = await fetch(weatherAPI);
  apiData = await apiData.json();
  await renderUI(apiData);
  setTimeout(inserDate(), 60000);
  await setBackground();
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
