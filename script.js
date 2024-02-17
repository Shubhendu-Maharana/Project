const greeting = document.getElementById("greeting-text");
const time = document.getElementById("time");
const date = document.getElementById("date");

function getGreeting() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        greeting.innerText = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting.innerText = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 20) {
        greeting.innerText = "Good Evening";
    } else {
        greeting.innerText = "Good Night";
    }
}

function getCurrentTimeFormatted() {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    minutes = minutes < 10 ? `0${minutes}` : minutes;

    time.innerText = `${hours}:${minutes} ${ampm}`;
}

function getCurrentDateFormatted() {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    // Add ordinal suffix to the day
    const ordinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        }
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    date.innerText = `${ordinalSuffix(day)} ${month} ${year}`;
}

const quote = document.getElementById("quote");
const author = document.getElementById("author");

fetch("quotes.json")
    .then(res => res.json())
    .then(data => {
        let min = 0, max = data.quotes.length - 1;
        let random = parseInt(Math.random() * (max - min) + min);
        quote.innerText = data.quotes[random].quote;
        author.innerText = data.quotes[random].author;
    })

const city = "Berhampur";
const WEATHER_API_KEY = "12ff0dc2354044f397f112153241801";
const WEATHER_API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=5&aqi=no`;
const weather = document.getElementById("weather");

fetch(WEATHER_API_URL)
    .then(res => res.json())
    .then(data => {
        weather.innerHTML = `
        <div class="info">
            <h3>${data.current.condition.text}</h3>
            <h3>Temp: ${data.current.temp_c}</h3>
        </div>
        <img src="https:${data.current.condition.icon}" alt="">
        `;
    })
    .catch(error => {
        console.error(error);
    })

getGreeting();
// getCurrentTimeFormatted();
// getCurrentDateFormatted();
// setInterval(getCurrentTimeFormatted, 2000);

