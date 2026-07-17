const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastmodified");
const windChillElement = document.querySelector("#windchill");

const temperature = 14;
const windSpeed = 10;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

if (windChillElement) {
    if (temperature <= 10 && windSpeed > 4.8) {
        windChillElement.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
    } else {
        windChillElement.textContent = "N/A";
    }
}
