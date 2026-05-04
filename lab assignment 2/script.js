
const API_KEY = 'cb7c3e281bcdd9db2083ecdf32ad5b4e';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.querySelector('#inputBox1 input');
const weatherInfo = document.getElementById('weather-info');
const historyContainer = document.getElementById('inputBox1');


window.onload = () => {
    displayHistory();
};


function logEventLoop(message) {
    console.log(message);
    const logDisplay = document.createElement('p');
    logDisplay.textContent = message;
    const logsContainer = document.getElementById('logs-display');
    if (logsContainer) {
        logsContainer.appendChild(logDisplay);
    }
}


async function fetchWeather(city) {
    logEventLoop("Sync: Start Fetching...");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        
        
        Promise.resolve().then(() => logEventLoop("Promise .then (Microtask)"));

        
        setTimeout(() => logEventLoop("setTimeout (Macrotask)"), 0);

        renderWeather(data);
        saveToHistory(city);
        logEventLoop("ASYNC: Data received");

    } catch (error) {
        logEventLoop(`Error: ${error.message}`);
        weatherInfo.innerHTML = `<h5 style="color: red;">${error.message}</h5>`;
    } finally {
        logEventLoop("Sync: End");
    }
}


function renderWeather(data) {
    weatherInfo.innerHTML = `
        <h5>Weather info</h5>
        <p><strong>City:</strong> ${data.name}, ${data.sys.country}</p>
        <p><strong>Temp:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].main}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
    `;
}


function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherHistory', JSON.stringify(history));
        displayHistory();
    }
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    const historyButtonsDiv = document.getElementById('history-buttons');
    historyButtonsDiv.innerHTML = '';

    history.forEach(city => {
        const btn = document.createElement('button');
        btn.textContent = city;
        btn.className = 'history-btn';
        btn.onclick = () => fetchWeather(city);
        historyButtonsDiv.appendChild(btn);
    });
}


searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});