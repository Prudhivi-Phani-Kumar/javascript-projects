const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const getWeatherData = async (cityName) => {
  const apiKey = "75faca06ed1cef475fcdf1ea86945ec7";
  const weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric";

  const res = await fetch(weatherUrl + `&q=${cityName}` + `&appid=${apiKey}`);

  if (res.status === 404 || res.status === 400) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await res.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      data.main.temp
    )}°C`;
    document.querySelector(".mode").innerHTML = data.weather[0].main;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

    const weatherModes = ["Clouds", "Clear", "Mist", "Rain", "Drizzle", "Haze"];

    if (weatherModes.indexOf(data.weather[0].main) !== -1) {
      weatherIcon.src = `images/${data.weather[0].main.toLowerCase()}.png`;
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
};

searchButton.addEventListener("click", () => {
  getWeatherData(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});
