function getWeatherUrl() {
  const url = localStorage.getItem("setting-finalurl");
  return url;
}

async function loadWeather(url) {
  const weatherJson = await fetch(url).then((response) => response.json());
  return weatherJson.data[0];
}

async function getWeatherData(url) {
  const weatherData = await loadWeather(url);
  const temperature = weatherData.temp;
  const apparentTemperature = weatherData.app_temp;
  const weatherDescription = weatherData.weather.description;
  return [temperature, apparentTemperature, weatherDescription];
}

function showWeatherData(temperature, apparentTemperature, description) {
  const temperatureField = document.querySelector("#temperature");
  const weatherDescriptionField = document.querySelector(
    "#weather-description"
  );
  temperatureField.textContent = `${temperature}º - ${apparentTemperature}º`;
  weatherDescriptionField.textContent = description;
}

async function loadWeatherUi() {
  const weatherUrl = getWeatherUrl();
  const weatherData = await getWeatherData(weatherUrl);
  showWeatherData(...weatherData);
}

await loadWeatherUi();

export { loadWeatherUi };
