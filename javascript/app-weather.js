function getWeatherUrl() {
  const url = localStorage.getItem("setting-finalurl");
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
  const city = localStorage.getItem("setting-city");
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

await loadWeatherUi();

export { loadWeatherUi };
