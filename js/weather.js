const API_KEY = "7f81afbf9bd4e9beddcd0b10b50359f5";

function onGeoOK(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url).then(response => response.json()).then((data) => {
    const weather = document.querySelector("#weather");
    weather.innerText = `${data.weather[0].main} ${data.main.temp.toFixed(1)}℃ / ${data.name}`;
  })
}
function onGeoError() {
  alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
