const STORAGE_KEY = "owg-plan-submissions";

function populateRegionSelect() {
    const regionSelect = document.querySelector("#interest-region");

    if (!regionSelect || typeof regions === "undefined") {
        return;
    }

    regions.forEach((region) => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

function getSubmissionCount() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = Number.parseInt(raw, 10);

    if (Number.isNaN(parsed) || parsed < 0) {
        return 0;
    }

    return parsed;
}

function incrementSubmissionCount() {
    const next = getSubmissionCount() + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    return next;
}

function displayThanksMessage() {
    const messageEl = document.querySelector("#thanks-message");
    const countEl = document.querySelector("#submission-count");

    if (!messageEl && !countEl) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const name = params.get("visitor-name");
    const region = params.get("interest-region") || "Oregon";
    const experience = params.get("experience") || "any level";

    let count = getSubmissionCount();

    if (name) {
        count = incrementSubmissionCount();
    }

    if (messageEl) {
        if (name) {
            messageEl.textContent = `Thanks, ${name}! We saved your interest in the ${region} region for a ${experience} trip. Check your email for planning ideas soon.`;
        } else {
            messageEl.textContent = `Thanks for visiting. Submit the planning form to save a trip request from this browser.`;
        }
    }

    if (countEl) {
        countEl.textContent = `You have submitted ${count} trip-planning request${count === 1 ? "" : "s"} from this browser.`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateRegionSelect();
    displayThanksMessage();
});
