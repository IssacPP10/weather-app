// Selección de elementos
const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const APIKey = 'Aqui va la key de la api';

// Función para obtener datos del clima
const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

// Función para mostrar el error 404
const showError404 = () => {
    container.style.height = '450px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
};

// Función para actualizar los datos del clima en la UI
const updateWeatherUI = (data) => {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    const weatherCondition = data.weather[0].main;

    const weatherIcons = {
        Clear: 'img/clear.png',
        Rain: 'img/rain.png',
        Snow: 'img/snow.png',
        Clouds: 'img/cloud.png',
        Haze: 'img/mist.png',
    };

    image.src = weatherIcons[weatherCondition] || '';
    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    description.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '705px';
};

// Función principal para manejar el clic del botón de búsqueda
const handleSearch = async () => {
    const city = document.querySelector('.search-box input').value.trim();

    if (!city) {
        alert('Please enter a city name!');
        return;
    }

    const weatherData = await fetchWeatherData(city);

    if (!weatherData || weatherData.cod === '404') {
        showError404();
        return;
    }

    updateWeatherUI(weatherData);
};

// Asignar el evento al botón de búsqueda
searchButton.addEventListener('click', handleSearch);

// Asignar el evento para presionar Enter
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});