let apiKey = 'f242800729c0f59cd7429fbcc0681b70fbd8710794ac0ba1714daa2e';
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


async function fetchSunsetSunrise() {

    // getting user's location from IP DATA API
    const response = await fetch(`https://api.ipdata.co?api-key=${apiKey}`);
    const locationData = await response.json();
    const latitude = locationData.latitude;
    const longitude = locationData.longitude;
    const city = locationData.city;
    
    // getting the sunrise and sunset time in user's location from sunrise-sunset API
    const sunResponse = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
    const sunData = await sunResponse.json();
    const sunrise = new Date(sunData.results.sunrise);
    const sunset = new Date(sunData.results.sunset);

    // formatting to display only hour and minutes without seconds
    const formatedSunrise = sunrise.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    const formatedSunset = sunset.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    // creating DOM elements to display sunrise and sunset information
    // SUNSET & SUNRISE
    const sunriseDiv = document.getElementById('sunrise');
    const sunsetDiv = document.getElementById('sunset');
    
    const sunriseEl = document.createElement('h2');
    sunriseEl.innerText = formatedSunrise;
    const sunsetEl = document.createElement('h2');
    sunsetEl.innerText = formatedSunset;
    sunriseDiv.appendChild(sunriseEl);
    sunsetDiv.appendChild(sunsetEl);

    // DATE AND LOCATION
    const locationDiv = document.getElementById('location');
    const dayDiv = document.getElementById('day');
    const monthDiv = document.getElementById('month');

    const locationEl = document.createElement('h2');
    const dayEl = document.createElement('h2');
    const monthEl = document.createElement('h2');

    locationEl.innerText = city;
    dayEl.innerText = today.getDate();
    monthEl.innerText = months[today.getMonth()];

    locationDiv.appendChild(locationEl);
    dayDiv.appendChild(dayEl);
    monthDiv.appendChild(monthEl);


    // difference and total amount of daylight
    const firstDiv = document.getElementById('first-flex');
    const difference = sunset - sunrise;            
    const diff_result = new Date(difference);    
    let hourDiff = diff_result.getHours();
    const minutesDiff = diff_result.getMinutes() + 1;

    if (sunrise.getMinutes() > sunset.getMinutes()){
        hourDiff -= 1;
    }


    const totalEl = document.createElement('p');
    totalEl.innerText = `${hourDiff} hours and ${minutesDiff} minutes of daylight today`

    firstDiv.appendChild(totalEl)

}


fetchSunsetSunrise();

