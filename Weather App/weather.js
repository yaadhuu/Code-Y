const weatherform = document.querySelector(".weatherform");  
const cityinput = document.querySelector(".cityinput");      
const card = document.querySelector(".card");               
const apikey = "df2cd853bf9d10776d57fb16bd3859fa";          

weatherform.addEventListener("submit", async event => {
    event.preventDefault();  

    const city = cityinput.value.trim();  
    if (city === "") {
        displayerror("Please enter a city name.");
        return;
    }

    try {
        const weatherData = await getweatherdata(city);
        displayweatherinfo(weatherData);  
    } catch (error) {
        displayerror("Unable to retrieve weather data. Please try again.");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function displayweatherinfo(data) {
    const { name, main, weather } = data;

   
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const weatherIcon = weather[0].icon;

   
    card.querySelector(".cityDisplay").textContent = name;
    card.querySelector(".tempDisplay").textContent = `${temperature}°C`;
    card.querySelector(".humidityDisplay").textContent = `Humidity: ${humidity}%`;
    card.querySelector(".descDisplay").textContent = description.charAt(0).toUpperCase() + description.slice(1);
    card.querySelector(".weatherEmoji").textContent = getweathericon(weatherIcon);
}

function getweathericon(weatherIcon) {
   
    const iconMap = {
        "01d": "☀️",
        "01n": "🌕", 
        "02d": "🌤", 
        "02n": "🌥", 
        
    };
    return iconMap[weatherIcon] || "🌈";  
}

function displayerror(message) {
    const errordisplay = card.querySelector(".errorDisplay");
    errordisplay.textContent = message;
    errordisplay.style.display = "block";  
    setTimeout(() => {
        errordisplay.style.display = "none";  
    }, 3000);
}
