const cidade = 'Castelo Branco';
const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=' + cidade + ',pt&appid=74ceb3b2518f00e1284ce45255274e36&units=metric&lang=pt';

//Get HTML elements
const cityNameEl = document.querySelector(".cityName");
const iconEl = document.querySelector("img");
const tempEl = document.querySelector(".temp");
const descEl = document.querySelector(".description");

//Fetch OpenWeatherMap API
fetch(weatherAPI)
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

//Football API
const footballAPI = 'http://api.football-data.org/';
const primeiraLiga = 2017;

//Fetch Primeira Liga Standings
fetch(footballAPI + 'v2/competitions/' + primeiraLiga + '/standings', {
  headers: {"X-Auth-Token" : "026a9b64b04e4fb8a3bcf7fb0dac2ae0"}
})
  .then(response => response.json())
  .then(result => {
    console.log(result);
    const position = result.standings[0].table;
    let i = 0;
    for (i; i < position.length; i++) {
      const clubLogo = result.standings[0].table[i].team.crestUrl;
      const clubName = result.standings[0].table[i].team.name;
      const clubPoints = result.standings[0].table[i].points;
      insertPosition(position, i, clubLogo, clubName, clubPoints);
    }
  });

function insertPosition(position, i, clubLogo, clubName, clubPoints) {
  const tableEl = document.querySelector("tbody");
  const posTemplate = 
    `<tr>
      <td class="position">${position[i].position}.</td>
      <td><img class="teamLogo" src="${clubLogo}"></td>
      <td class="team">${clubName}</td>
      <td class="points">${clubPoints}</td>
    </tr>`
  tableEl.insertAdjacentHTML('beforeend', posTemplate);
}