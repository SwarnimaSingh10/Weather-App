async function getWeather() {
  const city = document.getElementById("city").value;
  const errorMessage = document.getElementById("error-message");
  const weatherResult = document.getElementById("weatherResult");

  // Clear previous messages
  errorMessage.textContent = "";
  weatherResult.textContent = "";

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  try {
    const apiKey = "eac66bbb899dd5c9306731c83b807617"; 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Patna&appid=eac66bbb899dd5c9306731c83b807617`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Log the full API response for reference

    if (data.cod === "404") {
      errorMessage.textContent = "City not found. Please try again.";
    } else if (data.cod === 200) {
      // Convert temperatures from Kelvin to Celsius
      const temperature = Math.round(data.main.temp - 273.15);
      const feelsLike = Math.round(data.main.feels_like - 273.15);
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const cityName = data.name;
      const country = data.sys.country;

      // Display weather information
      weatherResult.innerHTML = `
        <p><strong>Weather in ${cityName}, ${country}:</strong></p>
        <p><strong>Description:</strong> ${weatherDescription}</p>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      `;
    } else {
      errorMessage.textContent = "Something went wrong. Please try again.";
    }

  } catch (error) {
    console.error("Error fetching weather data:", error); // Log error in console
    errorMessage.textContent = "An error occurred. Please try again.";
  }
}
