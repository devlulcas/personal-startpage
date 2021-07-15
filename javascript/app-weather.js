const ls = localStorage;

//Elements
const modal = document.querySelector("[data-modal-active]");
const modalForm = document.getElementById("weather-configs");
const modalOpenButton = document.getElementById("modal-open-button");
const modalCancelButton = document.getElementById("modal-cancel-button");
const modalSaveButton = document.getElementById("modal-save-button");
const modalInputs = [...modalForm.elements].filter((element) => {
  if (element.type == "text") return element;
});

//Event listeners
window.onload = () => {
  loadConfigUi();
  createWeatherURL();
};

modalOpenButton.onclick = () => {
  loadConfigUi();
  openModal();
};

modalCancelButton.onclick = (ev) => {
  ev.preventDefault();
  closeModal();
};

modalSaveButton.onclick = async (ev) => {
  ev.preventDefault();
  saveConfigFromUiToStorage();
  createWeatherURL();
  await loadWeatherUi();
  closeModal();
};

//Functions
function openModal() {
  modal.dataset.modalActive = "true";
}

function closeModal() {
  modal.dataset.modalActive = "false";
}

function getConfig() {
  const apiKey = ls.getItem("setting-apikey") || "123";
  const country = ls.getItem("setting-country") || "brazil";
  const state = ls.getItem("setting-state") || "bahia";
  const city = ls.getItem("setting-city") || "salvador";
  return {
    apiKey,
    country,
    state,
    city,
  };
}

function setConfig(
  apiKey = "123",
  country = "brazil",
  state = "bahia",
  city = "salvador"
) {
  ls.setItem("setting-apikey", apiKey);
  ls.setItem("setting-country", country);
  ls.setItem("setting-state", state);
  ls.setItem("setting-city", city);
}

function loadConfigUi() {
  const storedConfig = getConfig();
  modalInputs[0].value = storedConfig.apiKey;
  modalInputs[1].value = storedConfig.country;
  modalInputs[2].value = storedConfig.state;
  modalInputs[3].value = storedConfig.city;
}

function saveConfigFromUiToStorage() {
  const newConfig = modalInputs.map((input) => input.value.toLowerCase());
  setConfig(...newConfig);
}

function createWeatherURL() {
  const config = getConfig();
  const baseUrl = `https://api.weatherbit.io/v2.0/current?`;
  const configUrl = `city=${config.city}&country=${config.country}&state=${config.state}&lang=pt&key=${config.apiKey}`;
  const finalurl = `${baseUrl}${configUrl}`;
  ls.setItem("setting-finalurl", finalurl);
}

//-----------

function getWeatherUrl() {
  const url = ls.getItem("setting-finalurl");
  return url;
}

async function loadWeather(url) {
  try {
    const weatherJson = await fetch(url).then((response) => response.json());
    return weatherJson.data[0];
  } catch (error) {
    console.log(error);
    const falseResponse = {
      temp: "XX",
      app_temp: "XX",
      weather: { description: "XXXXXX" },
    };
    return falseResponse;
  }
}

async function getWeatherData(url) {
  const weatherData = await loadWeather(url);
  const temperature = weatherData.temp;
  const apparentTemperature = weatherData.app_temp;
  const weatherDescription = weatherData.weather.description;
  return [temperature, apparentTemperature, weatherDescription];
}

function changeIconTitle() {
  const icon = document.getElementById("weather-app-icon");
  const city = ls.getItem("setting-city");
  icon.title = `Clima em ${city.charAt(0).toUpperCase()}${city.slice(1)}`;
}

function showWeatherData(temperature, apparentTemperature, description) {
  const temperatureField = document.getElementById("temperature");
  const weatherDescriptionField = document.querySelector(
    "#weather-description"
  );
  temperatureField.textContent = `${temperature}º - ${apparentTemperature}º`;
  weatherDescriptionField.textContent = description;
  changeIconTitle();
}

async function loadWeatherUi() {
  const weatherUrl = getWeatherUrl();
  const weatherData = await getWeatherData(weatherUrl);
  showWeatherData(...weatherData);
}

window.onload = async () => await loadWeatherUi();

//export { loadWeatherUi };
