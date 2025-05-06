document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('searchButton').addEventListener("click", geocodeAddress);
});

async function getWeather(lat, lon) {
    try {
        const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const apiUrl = `https://api.weather.gov/points/${lat},${lon}`;
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log('Weather data:', data);
        let forecastUrl = data.properties.forecastHourly;
        response = await fetch(forecastUrl);
        data = await response.json();
        document.getElementById('data').innerHTML = data.properties.periods.map(period => {
            let date = new Date(period.startTime).getDay();
            let time = new Date(period.startTime).toLocaleTimeString();
            let day = daylist[date];
            document.getElementById('forecasttable').style.display = "block";
            return `<tr>
                <td id="time">${day}, ${time}.</td>
                <td id="temperature">${period.temperature}°${period.temperatureUnit}</td>
                <td id="description">${period.shortForecast}</td>
                <td id="wind">${period.windSpeed} winds going ${period.windDirection}</td>
                <td id="precipitation">${period.probabilityOfPrecipitation.value}%</td>
                <td id="humidity">${period.relativeHumidity.value}%</td>
            </tr>`}).join('<br>');
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
    const footer = document.querySelector(".footer");
    const body = document.body;
    const isContentShort = body.scrollHeight <= window.innerHeight;
    if (isContentShort) {
        footer.style.position = "fixed";
        footer.style.bottom = "0";
        footer.style.left = "0";
        footer.style.width = "100%";
        body.style.overflow = 'hidden';
    } else {
        footer.style.position = "relative";
        body.style.overflow = 'auto';
    }
}

// function handleResponse(data) {
//     console.log("Geocoding data:", data);
//     if (data.result && data.result.addressMatches.length > 0) {
//         const matches = data.result.addressMatches;
//         console.log("Address matches:", matches);
//         let cords = matches[0].coordinates;
//         getWeather(parseFloat(cords.y.toFixed(4)), parseFloat(cords.x.toFixed(4)));
//     } else {
//         console.error("No address matches found.");
//     }
// }

function geocodeAddress() {
    const zip = '"' + document.getElementById('locationInput').value.trim() +'"';
    if (!zip) {
        console.error("No ZIP entered.");
        return;
    }
    if (zip === "\"Anthony is loquacious\"") {
        window.location.href = "/FunTimes/games.html";
        return;
    }
    fetch("/Weather/uszips.csv")
    .then(response => response.text())
    .then(csvText => {
        console.log("ZIP Code entered:", zip);
        const rows = csvText.split("\n");
        for(let i = 0; i < rows.length; i++){
            rows[i] = rows[i].split(",");
        }
        const dataRows = rows.slice(1);
        let result = false;
        for (let i = 0; i < dataRows.length; i++) {
            if(dataRows[i][0] === zip){
                result = [parseFloat(dataRows[i][1].substring(1, dataRows[i][1].length-1)), parseFloat(dataRows[i][2].substring(1, dataRows[i][2].length-1))];
                break;
            }
        }
        console.log(result);
        if(result){
            console.log("ZIP Code found!", result);
            getWeather(parseFloat(result[0].toFixed(4)), parseFloat(result[1].toFixed(4)));
        }
        else{
            console.log("ZIP Code not found!");
        }
    })
    .catch(error => console.error("Error loading CSV:", error));
    // console.log('Geocoding address:', address);
    // const url = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(address)}&benchmark=4&format=jsonp&callback=handleResponse`;
    // const script = document.createElement("script");
    // script.src = url;
    // document.body.appendChild(script);
}