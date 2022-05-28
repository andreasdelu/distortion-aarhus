// Her sættes variabler for HTML elementerne

const areas = document.querySelectorAll(".kort-area");
const mainMap = document.getElementById("kort-alt");
const arrows = document.querySelectorAll(".arrow-back");

let currentMap;
let currentArea;

// De tre områder på kortet får hver deres eventListener, der får currentMap og currentArea til at have samme værdi som id'et på det element de refererer til i HTML koden
// curMap er det omrids af bydelen der vises når kortet er zoomet ind, dets display bliver nu sat fra "none" til "flex" for at vise elementet.
// zoomIn bliver kaldt med elementet som parameter

areas.forEach((area) => {
  area.addEventListener("click", function () {
    currentMap = "area-" + this.dataset.area;
    currentArea = "kort-" + this.dataset.area;
    const curMap = document.getElementById(currentMap);
    curMap.style.display = "flex";
    zoomIn(this);
  });
});

// Hver pil der tager brugeren tilbage til det store kort får også en eventListener der animerer omridset af bydelen fra opacity 1 til 0.
// Efter en settimeout sættes bydelens display til "none" og zoomOut funktionen kaldes

arrows.forEach((arrow) => {
  arrow.addEventListener("click", function () {
    const dur = 200;
    const curMap = document.getElementById(currentMap);
    curMap.animate([{ opacity: "0" }], {
      fill: "forwards",
      duration: dur,
      easing: "ease",
    });
    setTimeout(() => {
      curMap.style.display = "none";
      zoomOut();
    }, dur);
  });
});

// zoomIn bruger et HTML elements data-area attribute for at se hvilken del af kortet der skal zoomes ind på, dette findes i et switch statement
// Værdierne er arbitrære og er fundet gennem trial and error i css
// Efter zoom ind animationen i switch blokken, fader det farvede område ud og omridset fader ind. 

function zoomIn(area) {
  const dur = 600;
  const curMap = document.getElementById(currentMap);
  switch (area.dataset.area) {
    case "oe":
      mainMap.animate([{ transform: "translate(-145%, 133%) scale(4.5)" }], {
        fill: "forwards",
        duration: dur,
        easing: "ease-in-out",
      });
      break;

    case "aa":
      mainMap.animate([{ transform: "translate(22%, 18%) scale(4.2)" }], {
        fill: "forwards",
        duration: dur,
        easing: "ease",
      });
      break;

    case "x":
      mainMap.animate([{ transform: "translate(20%, -62%) scale(2.4)" }], {
        fill: "forwards",
        duration: dur,
        easing: "ease",
      });
      break;

    default:
      break;
  }
  setTimeout(() => {
    area.animate([{ opacity: "0" }], {
      fill: "forwards",
      duration: 100,
      easing: "ease",
    });
    curMap.animate([{ opacity: "1" }], {
      fill: "forwards",
      duration: 100,
      easing: "ease",
    });
  }, dur - 100);
}

// fader det farvede område ind og zoomer kortet ud til startpositionen

function zoomOut() {
  const curArea = document.getElementById(currentArea);
  curArea.animate([{ opacity: "1" }], {
    fill: "forwards",
    duration: 100,
    easing: "ease",
  });
  mainMap.animate([{ transform: "scale(1) translate(0%, 0%)" }], {
    fill: "forwards",
    duration: 400,
    easing: "ease",
  });
}

// KORTNÅL LOGIK vvvvv

// HTML elementer laves til variabler
const oeLocations = document.getElementById("oe-locations");
const aaLocations = document.getElementById("aa-locations");
const xLocations = document.getElementById("x-locations");

// fetcher pincoords.json filen der indeholder alt data om de forskellige scener på festivalen
async function getPins() {
    const res = await fetch("../kort/pincoords.json");
    const data = await res.json();
    return data;
}


getPins()
.then(data => placePins(data));

// placePins går gennem hvert objekt i pincoords filen og kører createPin funktionen med dataen for hver lokation som parameter
// Derefter appendes disse til deres respektive HTML element

function placePins(data) 
{  
    data.oe.forEach((location) => {
      oeLocations.appendChild(createPin(location));
    });
    data.aa.forEach((location) => {
      aaLocations.appendChild(createPin(location));
    });
    data.x.forEach((location) => {
      xLocations.appendChild(createPin(location));
    });
}

// Der bruges createElement til at lave nålen, navnet og containeren for hver lokation
// containeren har en eventlistener der laver den popup der viser info om området

function createPin(location) {
  const pin = document.createElement("img");
  pin.src = "../images/kort/loca.svg";
  pin.classList.add("location-pin");

  const pinName = document.createElement("p");
  pinName.innerText = location.name.replace("aa", "å").toUpperCase();
  pinName.classList.add("location-name");

  const pinContainer = document.createElement("div");
  pinContainer.classList.add("pin-container");
  pinContainer.style.top = location.top;
  pinContainer.style.left = location.left;
  pinContainer.dataset.name = location.name.replace("aa", "å");

  pinContainer.appendChild(pinName);
  pinContainer.appendChild(pin);
  pinContainer.addEventListener("click", function(){createModal(location)})

  return pinContainer;
}

// POPUP MODAL LOGIK vvvvv

//link til google maps API
const mapsLink = "https://www.google.com/maps/search/?api=1&query=";

const modal = document.getElementById("kort-popup");

//Skifter al dataen i modal til dataen fra objektet i parametret
function createModal(obj) {

    const banner = document.getElementById("modal-top");
    const name = document.getElementById('modal-name');
    const img = document.getElementById("modal-img");
    const location = document.getElementById('modal-location');
    const link = document.getElementById('modal-link');
    const date = document.getElementById('modal-date');
    const info = document.getElementById('modal-info');

    banner.style.backgroundColor = `var(--${obj.color})`
    name.innerText = obj.name.replace("aa", "å");
    img.src = `../images/kort/${obj.name}.svg`;
    link.onclick = () => {
      window.open(mapsLink + obj.location)
    }
    date.innerText = obj.date;
    info.innerText = obj.info;

    modal.style.display = "flex"

}

// Fjerner modal når bruger klikker bag ved modal eller på krydset

document.getElementById("modal-bg").addEventListener("click", () => {
    modal.style.display = "none"
})

document.getElementById("modal-close").addEventListener("click", () => {
    modal.style.display = "none"
})

