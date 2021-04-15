//declared variable for api_key
const API_KEY = "75a509bd9aa5192f3561ad92ebafd98c";

//get from local storage
const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));
  //if === null
  if (localStorageData === null) {
    return [];
  } else {
    return localStorageData;
  }
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

// For each city construct a list item and append to the list group
const renderCitiesFromLocalStorage = () => {
  $("#searched-cities").empty();

  const cities = getFromLocalStorage();

  const ul = $("<ul>").addClass("list-group");

  const appendListItemToUl = (city) => {
    const li = $("<li>")
      .addClass("list-group-item")
      .attr("data-city", city)
      .text(city);

    ul.append(li);
  };

  cities.forEach(appendListItemToUl);

  //ul.on("click", getDataByCityName);

  $("#searched-cities").append(ul);
};

// getCurrentData()  and store in currentData
const getCurrentData = (data, name) => {
  const current = data.current;
  // from object extract the data points you need for the return data
  return {
    cityName: name,
    temperature: current.temp,
    humidity: current.humidity,
    windSpeed: current.wind_speed,
    date: moment.unix(current.dt).format("MM/DD/YYYY"),
    iconURL: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
    uvi: current.uvi,
  };
};

const getForecastData = (data) => {
  //iterate and construct the return data array
  return {
    date: moment.unix(data.dt).format("MM/DD/YYYY"),
    iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temperature: data.temp.day,
    humidity: data.humidity,
  };
};

const renderCurrentDayCard = (currentData) => {
  // from current data build the current card component
  //currentCityTitle
  $("currentCityTitle").text(currentData);
  //temperature

  //humidity

  //windspeed

  //uvIndex
};

const renderForecastCard = (cardData) => {
  //Build new template card
  let forecastCard = `
  <div class="col">
    <div class="card">
      <div class="card-body">
        <img alt="weather icon" src="http://openweathermap.org/img/wn/${cardData.icon}@2x.png">
        <h5 class="card-title">${cardData.date}</h5>
        <p class="card-text">Temp: ${cardData.temperature}</p>
        <p class="card-text">Humidity: ${cardData.humidity}</p>
      </div>
    </div>
  </div>`;

  //put card in html using jquery
};

// function called when the form is submitted
const onSubmit = async (event) => {
  // get city name and store in variable called cityName
  // fetchAllWeatherData(cityName)
  //event.preventDefault(); //Stops form from refreshing page

  const cityName = $("#city-input").val();
  const cities = getFromLocalStorage();

  cities.push(cityName);

  localStorage.setItem("cities", JSON.stringify(cities));

  renderCitiesFromLocalStorage();

  $("#city-input").val("");

  renderAllCards(cityName);
};

//GET CURRENT WEATHER:https://openweathermap.org/current (documentation)
const renderAllCards = async (cityName) => {
  // construct URL for http://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY} and store in variable called as weatherApiUrl
  const currentDayUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

  const currentDayResponse = await fetchData(currentDayUrl);

  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentDayResponse.coord.lat}&lon=${currentDayResponse.coord.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`;

  const forecastResponse = await fetchData(forecastUrl);

  const cardsData = forecastResponse.daily.map(function (item) {
    console.log(item);
  });

  $("#forecast-cards-container").empty();

  cardsData.slice(1, 6).forEach(renderForecastCard);

  const currentDayData = transformCurrentDayData(
    forecastResponse,
    currentDayResponse.name
  );

  renderCurrentDayCard(currentDayData);
};

const onReady = () => {
  renderCitiesFromLocalStorage();
};

/* $("#search-by-city-form").on("submit", onSubmit); */
$("#startSearch").click(function () {
  ///Code to run when search button clicked
  onSubmit();
});
$(document).ready(onReady);
