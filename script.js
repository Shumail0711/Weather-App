function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '772f33b21121546165222b8bb50af883';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDetails = document.getElementById('weatherDetails');
            if (data.cod === 200) {
                const temp = data.main.temp;
                const weather = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                weatherDetails.innerHTML = `
                    <h2>Current Weather in ${data.name}</h2>
                    <p>Temperature: ${temp}°C</p>
                    <p>Weather: ${weather}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
                getForecast(city, apiKey);
            } else {
                weatherDetails.innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            const weatherDetails = document.getElementById('weatherDetails');
            weatherDetails.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
}

function getForecast(city, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                let forecastHtml = `<h2>5-Day Forecast</h2>`;
                const forecastList = data.list;

                // Loop through the forecast data and pick one item per day (at 12:00 PM)
                for (let i = 0; i < forecastList.length; i += 8) {
                    const forecast = forecastList[i];
                    const date = new Date(forecast.dt_txt).toLocaleDateString();
                    const temp = forecast.main.temp;
                    const weather = forecast.weather[0].description;

                    forecastHtml += `
                        <div class="forecast-item">
                            <p><strong>${date}</strong></p>
                            <p>Temperature: ${temp}°C</p>
                            <p>Weather: ${weather}</p>
                        </div>
                    `;
                }

                const weatherDetails = document.getElementById('weatherDetails');
                weatherDetails.innerHTML += forecastHtml;
            }
        })
        .catch(error => {
            const weatherDetails = document.getElementById('weatherDetails');
            weatherDetails.innerHTML += `<p>Error fetching forecast data. Please try again later.</p>`;
        });
}
