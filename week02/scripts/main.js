const inputElement = document.querySelector("#favchap");
const formElement = document.querySelector("#chapter-form");
const addButton = document.querySelector("#add-button");
const listElement = document.querySelector("#list");
const feedbackElement = document.querySelector("#feedback");

const MAX_ENTRIES = 10;
const bookOfMormonBooks = [
    "1 Nephi",
    "2 Nephi",
    "Jacob",
    "Enos",
    "Jarom",
    "Omni",
    "Words of Mormon",
    "Mosiah",
    "Alma",
    "Helaman",
    "3 Nephi",
    "4 Nephi",
    "Mormon",
    "Ether",
    "Moroni",
];

function showMessage(message, type = "status") {
    feedbackElement.textContent = message;
    feedbackElement.dataset.state = type;
    feedbackElement.setAttribute("role", type === "error" ? "alert" : "status");
}

function clearMessage() {
    feedbackElement.textContent = "";
    feedbackElement.removeAttribute("data-state");
    feedbackElement.setAttribute("role", "status");
}

function normalizeBookName(bookName) {
    const normalizedBookName = bookName.trim().replace(/\s+/g, " ").toLowerCase();

    return bookOfMormonBooks.find(
        (book) => book.toLowerCase() === normalizedBookName
    ) || null;
}

function parseChapterEntry(rawValue) {
    const trimmedValue = rawValue.trim().replace(/\s+/g, " ");
    const chapterMatch = trimmedValue.match(/^(.*\S)\s+(\d+)$/);

    if (!chapterMatch) {
        return null;
    }

    const bookName = normalizeBookName(chapterMatch[1]);
    const chapterNumber = Number(chapterMatch[2]);

    if (!bookName || chapterNumber < 1) {
        return null;
    }

    return {
        bookName,
        chapterNumber,
        label: `${bookName} ${chapterNumber}`,
        key: `${bookName.toLowerCase()}|${chapterNumber}`,
    };
}

function updateControls() {
    const atLimit = listElement.children.length >= MAX_ENTRIES;

    addButton.disabled = atLimit;
    addButton.setAttribute("aria-disabled", String(atLimit));
}

formElement.addEventListener("submit", function (event) {
    event.preventDefault();

    if (listElement.children.length >= MAX_ENTRIES) {
        showMessage("Top 10 reached. Remove a chapter before adding another.", "error");
        inputElement.focus();
        return;
    }

    const chapterEntry = parseChapterEntry(inputElement.value);

    if (!chapterEntry) {
        inputElement.setAttribute(
            "aria-invalid",
            "true"
        );
        showMessage("Enter a valid Book of Mormon chapter, like Alma 5.", "error");
        inputElement.focus();
        inputElement.select();
        return;
    }

    if (listElement.querySelector(`[data-entry-key="${chapterEntry.key}"]`)) {
        inputElement.setAttribute("aria-invalid", "true");
        showMessage(`${chapterEntry.label} is already in the list.`, "error");
        inputElement.focus();
        inputElement.select();
        return;
    }

    inputElement.removeAttribute("aria-invalid");

    const listItem = document.createElement("li");
    listItem.dataset.entryKey = chapterEntry.key;

    const chapterLabel = document.createElement("span");
    chapterLabel.textContent = chapterEntry.label;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.setAttribute("aria-label", `Remove ${chapterEntry.label}`);
    deleteButton.textContent = "❌";

    deleteButton.addEventListener("click", function () {
        listItem.remove();
        showMessage(`${chapterEntry.label} removed from the list.`, "status");
        inputElement.focus();
        updateControls();
    });

    listItem.append(chapterLabel, deleteButton);
    listElement.appendChild(listItem);

    inputElement.value = "";
    showMessage(`${chapterEntry.label} added to your Top 10 list.`, "status");
    inputElement.focus();
    updateControls();
});

inputElement.addEventListener("input", function () {
    inputElement.removeAttribute("aria-invalid");
    clearMessage();
});

updateControls();



