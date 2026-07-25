
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastmodified");
const menuButton = document.querySelector("#menu");
const primaryNav = document.querySelector("#primary-nav");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("open");
        menuButton.textContent = isOpen ? "X" : "☰";
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            primaryNav.classList.remove("open");
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Concepción Chile Temple",
        location: "Concepción, Chile",
        dedicated: "2018, October, 28",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/concepcion-chile/2018/400x250/01-Concepcion-Chile-Temple-2113673.jpg"
    },
    {
        templeName: "Edmonton Alberta Temple",
        location: "Edmonton, Alberta, Canada",
        dedicated: "2011, December, 11",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/edmonton-alberta/400x250/edmonton-alberta-temple-lds-83329-wallpaper.jpg"
    },
    {
        templeName: "Frankfurt Germany Temple",
        location: "Frankfurt, Germany",
        dedicated: "1987, August, 28",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/frankfurt-germany/400x250/frankfurt-temple-1-2278179.jpg"
    },
];

createTempleCard(temples);

const templeOld = document.querySelector("#Old");

const templeNew = document.querySelector("#New");

const templeLarge = document.querySelector("#Large");

const templeSmall = document.querySelector("#Small");

const templeHome = document.querySelector("#Home");

templeHome.addEventListener("click", () => {
    document.querySelector(".res-grid").innerHTML = "";
    createTempleCard(temples);
});

templeNew.addEventListener("click", () => {
    document.querySelector(".res-grid").innerHTML = "";
    createTempleCard(temples.filter((temple) => temple.dedicated > "1999, December, 31"));
});

templeLarge.addEventListener("click", () => {
    document.querySelector(".res-grid").innerHTML = "";
    createTempleCard(temples.filter((temple) => temple.area > 90000));
});

templeSmall.addEventListener("click", () => {
    document.querySelector(".res-grid").innerHTML = "";
    createTempleCard(temples.filter((temple) => temple.area <= 10000));
});

templeOld.addEventListener("click", () => {
    document.querySelector(".res-grid").innerHTML = "";
    createTempleCard(temples.filter((temple) => temple.dedicated < "1900, January, 1"));
});

function createTempleCard(filteredTemples) {
    document.querySelector(".res-grid").innerHTML = "";
    filteredTemples.forEach((temple) => {
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedicated = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Area:</span> ${temple.area} sq ft`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `Image of ${temple.templeName}`);
        img.setAttribute("loading", "lazy");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(img);

        document.querySelector(".res-grid").appendChild(card);
    });

}