const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastmodified");
const reviewCountElement = document.querySelector("#review-count");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

const STORAGE_KEY = "reviewCount";
let reviewCount = Number(localStorage.getItem(STORAGE_KEY)) || 0;
reviewCount += 1;
localStorage.setItem(STORAGE_KEY, String(reviewCount));

if (reviewCountElement) {
    reviewCountElement.textContent = String(reviewCount);
}
