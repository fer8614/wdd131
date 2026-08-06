function getPetsLabel(allowsPets) {
    if (allowsPets) {
        return "Dog-friendly";
    }
    return "No pets";
}

function createWaterfallCard(falls) {
    const gemBadge = falls.hiddenGem
        ? `<span class="badge badge-gem">Hidden Gem</span>`
        : "";

    return `
        <article class="waterfall-card">
            <img src="${falls.image}" alt="${falls.alt}" loading="lazy" width="800" height="600">
            <div class="card-body">
                <div class="card-actions">
                    <span class="badge">${falls.difficulty}</span>
                    ${gemBadge}
                </div>
                <h3>${falls.name}</h3>
                <p class="card-meta">
                    <span>${falls.region}</span>
                    <span>${falls.distance}</span>
                    <span>${getPetsLabel(falls.pets)}</span>
                </p>
                <p><strong>Best season:</strong> ${falls.bestSeason}</p>
                <p><strong>Parking:</strong> ${falls.parking}</p>
                <p><strong>Tip:</strong> ${falls.tips}</p>
            </div>
        </article>
    `;
}

function renderCards(list, container) {
    if (!container) {
        return;
    }

    if (list.length === 0) {
        container.innerHTML = `
            <p class="no-results">No waterfalls match these filters. Try another region or clear a filter.</p>
        `;
        return;
    }

    container.innerHTML = list.map((falls) => createWaterfallCard(falls)).join("");
}

function filterWaterfalls(list, filters) {
    return list.filter((falls) => {
        if (filters.region !== "all" && falls.region !== filters.region) {
            return false;
        }

        if (filters.difficulty !== "all" && falls.difficulty !== filters.difficulty) {
            return false;
        }

        if (filters.petsOnly && !falls.pets) {
            return false;
        }

        if (filters.gemsOnly && !falls.hiddenGem) {
            return false;
        }

        return true;
    });
}

function setActiveRegion(region, buttons) {
    buttons.forEach((button) => {
        const isActive = button.dataset.region === region;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function getFiltersFromControls(regionSelect, difficultySelect, petsCheckbox, gemsCheckbox) {
    return {
        region: regionSelect ? regionSelect.value : "all",
        difficulty: difficultySelect ? difficultySelect.value : "all",
        petsOnly: petsCheckbox ? petsCheckbox.checked : false,
        gemsOnly: gemsCheckbox ? gemsCheckbox.checked : false
    };
}

function applyDirectoryFilters() {
    const gallery = document.querySelector("#waterfall-gallery");
    const regionSelect = document.querySelector("#filter-region");
    const difficultySelect = document.querySelector("#filter-difficulty");
    const petsCheckbox = document.querySelector("#filter-pets");
    const gemsCheckbox = document.querySelector("#filter-gems");
    const countEl = document.querySelector("#result-count");
    const regionButtons = document.querySelectorAll("[data-region]");

    const filters = getFiltersFromControls(
        regionSelect,
        difficultySelect,
        petsCheckbox,
        gemsCheckbox
    );

    const filtered = filterWaterfalls(waterfalls, filters);
    renderCards(filtered, gallery);

    if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${waterfalls.length} waterfalls`;
    }

    if (regionButtons.length) {
        setActiveRegion(filters.region, regionButtons);
    }
}

function initRegionFromQuery(regionSelect) {
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get("region");

    if (!regionParam || !regionSelect) {
        return;
    }

    const match = Array.from(regionSelect.options).find(
        (option) => option.value === regionParam
    );

    if (match) {
        regionSelect.value = regionParam;
    }
}

function initWaterfallsPage() {
    const gallery = document.querySelector("#waterfall-gallery");
    if (!gallery || typeof waterfalls === "undefined") {
        return;
    }

    const regionSelect = document.querySelector("#filter-region");
    const difficultySelect = document.querySelector("#filter-difficulty");
    const petsCheckbox = document.querySelector("#filter-pets");
    const gemsCheckbox = document.querySelector("#filter-gems");
    const regionButtons = document.querySelectorAll("[data-region]");
    const clearButton = document.querySelector("#clear-filters");

    initRegionFromQuery(regionSelect);
    applyDirectoryFilters();

    [regionSelect, difficultySelect, petsCheckbox, gemsCheckbox].forEach((control) => {
        if (control) {
            control.addEventListener("change", applyDirectoryFilters);
        }
    });

    regionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (regionSelect) {
                regionSelect.value = button.dataset.region;
            }
            applyDirectoryFilters();
        });
    });

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            if (regionSelect) {
                regionSelect.value = "all";
            }
            if (difficultySelect) {
                difficultySelect.value = "all";
            }
            if (petsCheckbox) {
                petsCheckbox.checked = false;
            }
            if (gemsCheckbox) {
                gemsCheckbox.checked = false;
            }
            applyDirectoryFilters();
        });
    }
}

function initHomeFeatured() {
    const featuredGrid = document.querySelector("#featured-grid");
    const gemsGrid = document.querySelector("#gems-grid");

    if (typeof waterfalls === "undefined") {
        return;
    }

    if (featuredGrid) {
        const featured = waterfalls.filter((falls) => falls.featured).slice(0, 3);
        renderCards(featured, featuredGrid);
    }

    if (gemsGrid) {
        const gems = waterfalls.filter((falls) => falls.hiddenGem).slice(0, 3);
        renderCards(gems, gemsGrid);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initWaterfallsPage();
    initHomeFeatured();
});
