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

//Football API
const TokenKey = '026a9b64b04e4fb8a3bcf7fb0dac2ae0';
const footballAPI = 'http://api.football-data.org/';
const primeiraLiga = 2017;

async function fetchFootballAPI() {
  //Fetch Primeira Liga Standings
  const response = await fetch(footballAPI + 'v2/competitions/' + primeiraLiga + '/standings', {
    headers: {"X-Auth-Token" : TokenKey}
  });
  const teamData = await response.json();
  console.log(teamData);
  const position = teamData.standings[0].table;
  position.forEach(function(element) {
    console.log(element);


    /*
    const clubLogo = element.standings.table.team.crestUrl;
    const clubName = element.standings.table.team.name;
    const clubPoints = element.standings.table.points;
    //insertData(position, clubLogo, clubName, clubPoints);
    
    let i = 0;
    for (i; i < position.length; i++) {
      const clubLogo = result.standings[0].table[i].team.crestUrl;
      const clubName = result.standings[0].table[i].team.name;
      const clubPoints = result.standings[0].table[i].points;
      insertData(position, i, clubLogo, clubName, clubPoints);
    } */
  })
  .catch(error => {
    console.log('Erro: ', error);
    document.querySelector("table").insertAdjacentHTML('afterbegin', error);
  }); 
}
fetchFootballAPI();

function setPositions() {
  const tableEl = document.querySelector("thead");
  const template = 
  `
  <
  `
  tableEl.insertAdjacentElement('afterbegin', template);
}

function insertData(position, i, clubLogo, clubName, clubPoints) {
  const tableEl = document.querySelector("table");
  const posTemplate = 
    `<tr>
      <th>${position[i].position}
    </tr>
    <tr>${clubPoints}</tr>`
  tableEl.insertAdjacentHTML('afterbegin', posTemplate);
}