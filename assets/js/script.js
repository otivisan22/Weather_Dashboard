//declared variable for api_key
const API_KEY = "75a509bd9aa5192f3561ad92ebafd98c";

//get from local storage
const getFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem("cities"));
//if === null
  if (localStorageData === null) {
    return[]
    else {
return localStorageData;
    }
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

const renderCities = (citiesFromLocalStorage) => {
  // For each city construct a list item and append to the list group
};

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


const renderCurrentCardComponent = (currentData) => {
  // from current data build the current card component
};

const renderForecastCardComponent = (forecastData) => {
  // from current data build the current card component
};

const fetchAllWeatherData = (cityName) => {
  //GET CURRENT WEATHER:https://openweathermap.org/current (documentation)

  // construct URL for http://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY} and store in variable called as weatherApiUrl
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

  console.log(url);
  const functionForJSON = (responseObject) => {
    // unless you have some logic here do that before you return
    return responseObject.json();
  };
  const functionForApplication = (dataFromServer) => {
    //GET 5 DAYS FORECAST: https://openweathermap.org/api/one-call-api (documentation)

    // whatever your application code is goes here
    // 1. from the dataFromServer get the lat and lon
    // 2. use lat lon to construct https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API_KEY} and store in variable called oneApiUrl

    const functionForJSON = (responseObject) => {
      // unless you have some logic here do that before you return
      return responseObject.json();
    };
    const functionForApplication = (dataFromServer) => {
      // whatever your application code is goes here
      // call a function getCurrentData() to get the current data from dataFromServer
      // getCurrentData()  and store in currentData
      // getForecastData() and store in forecastData
      // renderCurrentCardComponent(currentData);
      // renderForecastCardComponent(forecastData);
    };
    const functionToHandleError = (errorObject) => {
      // handle your error here according to your application
    };
    fetch(oneApiUrl)
      .then(functionForJSON)
      .then(functionForApplication)
      .catch(functionToHandleError);
  };
  const functionToHandleError = (errorObject) => {
    // handle your error here according to your application
  };
  fetch(weatherApiUrl)
    .then(functionForJSON)
    .then(functionForApplication)
    .catch(functionToHandleError);
};

// function called on load of the document
const onLoad = () => {
  // read from local storage amd store data in variable called citiesFromLocalStorage
  // if data is present call renderCities and pass the data from local storage
  // renderCities(citiesFromLocalStorage)
  // get the last city name from citiesFromLocalStorage and store in variable called cityName
  // fetchAllWeatherData(cityName)
};


// function called when the form is submitted
const onSubmit = async (event) => {
   // get city name and store in variable called cityName
  // fetchAllWeatherData(cityName)
  event.preventDefault();

const cityName = $("#city-input").val();
const cities = getFromLocalStorage();

cities.push(cityName);

localStorage.setItem("cities", JSON.stringify(cities));

renderCitiesFromLocalStorage();

$("#city-input").val("");

renderAllCards(cityName);
};

const onClick = () => {
  // get city name from the list item that was clicked and store in variable called cityName
  // fetchAllWeatherData(cityName)
};

$("#target-your-list-items").click(onClick);

$("#your-form-id").submit(onSubmit);

$(document).ready(onLoad);
