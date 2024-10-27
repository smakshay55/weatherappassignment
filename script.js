

const apiKey = '5c1739c76ae04c21a03163023240810';

const searchBox = document.querySelector('.inputBox');
const searchBtn = document.querySelector('.searchBtn');
const conditionImg = document.querySelector('.conditionImg');
const temperature = document.querySelector('.temperature');
const condition = document.querySelector('.condition');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');
const error = document.querySelector('.error');

const fetchWeather = () => {
    let query = searchBox.value.trim();
    
    if (!query) {
        error.style.display = 'block';
        error.innerHTML = 'Please enter a location!';
        return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            let weatherReport = data.current;
            console.log(weatherReport);
            conditionImg.src = `https:${weatherReport.condition.icon}`;
            temperature.innerHTML = `${weatherReport.temp_c}°C`;
            condition.innerHTML = weatherReport.condition.text;
            humidity.innerHTML = `Humidity: ${weatherReport.humidity}%`;
            windSpeed.innerHTML = `Wind Speed: ${weatherReport.wind_kph} km/h`;
            error.style.display = 'none'; // Hide error on success
        })
        .catch((err) => {
            error.style.display = 'block';
            error.innerHTML = 'Location not matched, please try again.';
            console.error(err);
        });
};

searchBtn.addEventListener('click', fetchWeather);

// Allow pressing "Enter" key to search as well
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
