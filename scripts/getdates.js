
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastmodified");

currentYear.textContent = new Date().getFullYear();
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;