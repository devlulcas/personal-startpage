import { loadWeatherUi } from "./app-weather.js";
const ls = localStorage;

//The modal itself
const modal = document.querySelector("[data-modal-active]");
//Modal elements
const modalForm = document.querySelector("#weather-configs");
const modalOpenButton = document.querySelector("#modal-open-button");
const modalCancelButton = document.querySelector("#modal-cancel-button");
const modalSaveButton = document.querySelector("#modal-save-button");
//Getting the form elements and extracting only the inputs
const modalInputs = [...modalForm.elements].filter((element) => {
  if (element.type == "text") return element;
});

//Change the modalActive data attribute to open/close the modal
function openModal() {
  modal.dataset.modalActive = "true";
}
function closeModal() {
  modal.dataset.modalActive = "false";
}

//Get the config stored in local storage
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

//Set the config in local storage
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

//Load the stored config in the input fields
function loadConfig() {
  const storedConfig = getConfig();
  modalInputs[0].value = storedConfig.apiKey;
  modalInputs[1].value = storedConfig.country;
  modalInputs[2].value = storedConfig.state;
  modalInputs[3].value = storedConfig.city;
}
//Treat the config an save them in ls
function saveConfig() {
  const newConfig = modalInputs.map((input) => input.value.toLowerCase());
  setConfig(...newConfig);
}

//Create a new apiUrl and store it
function createWeatherURL() {
  const config = getConfig();
  const baseUrl = `https://api.weatherbit.io/v2.0/current?`;
  const configUrl = `city=${config.city}&country=${config.country}&state=${config.state}&lang=pt&key=${config.apiKey}`;
  const finalurl = `${baseUrl}${configUrl}`;
  ls.setItem("setting-finalurl", finalurl);
}

//-----> Buttons
window.onload = () => {
  loadConfig();
  createWeatherURL();
};

//Opens the modal with the actual config
modalOpenButton.onclick = () => {
  loadConfig();
  openModal();
};
//Close the modal
modalCancelButton.onclick = (event) => {
  event.preventDefault();
  closeModal();
};
//Save the configs then closes the modal
modalSaveButton.onclick = async (event) => {
  event.preventDefault();
  saveConfig();
  createWeatherURL();
  await loadWeatherUi();
  closeModal();
};
