const areas = document.querySelectorAll(".kort-area");
const mainMap = document.getElementById("kort-alt");
const arrows = document.querySelectorAll(".arrow-back");

let currentMap;
let currentArea;

areas.forEach((area) => {
  area.addEventListener("click", function () {
    currentMap = "area-" + this.dataset.area;
    currentArea = "kort-" + this.dataset.area;
    const curMap = document.getElementById(currentMap);
    curMap.style.display = "flex";
    zoomIn(this);
  });
});

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

function zoomIn(area) {
  const dur = 600;
  const curMap = document.getElementById(currentMap);
  curMap.style.display = "flex;";
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

const oeLocations = document.getElementById("oe-locations");
const aaLocations = document.getElementById("aa-locations");
const xLocations = document.getElementById("x-locations");

async function getPins() {
    const res = await fetch("../kort/pincoords.json");
    const data = await res.json();

    return data;
}

getPins()
.then(data => placePins(data));

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


function createPin(location) {
  const div = document.createElement("div");
  div.classList.add("pin-container");
  const pin = document.createElement("img");
  pin.src = "../images/kort/loca.svg";
  pin.classList.add("location-pin");
  const p = document.createElement("p");
  p.innerText = location.name.toUpperCase();
  p.classList.add("location-name");
  div.style.top = location.top;
  div.style.left = location.left;
  div.dataset.name = location.name;
  div.dataset.color = location.color;
  div.dataset.location = location.location;
  div.dataset.date = location.date;
  div.appendChild(p);
  div.appendChild(pin);
  div.addEventListener("click", function(){createModal(this)})
  return div;
}

const mapsLink = "https://www.google.com/maps/search/?api=1&query=";

const modal = document.getElementById("kort-popup");

function createModal(data) {
    data = data.dataset;
    const banner = document.getElementById("modal-top");
    const name = document.getElementById('modal-name');
    const img = document.getElementById("modal-img");
    const location = document.getElementById('modal-location');
    const link = document.getElementById('modal-link');
    const date = document.getElementById('modal-date');
    const info = document.getElementById('modal-info');

    banner.style.backgroundColor = `var(--${data.color})`
    name.innerText = data.name;
    img.src = `../images/kort/${data.name}.svg`
    location.innerText = data.location;
    link.href = mapsLink + data.location;
    date.innerText = data.date;

    modal.style.display = "flex"

}

document.getElementById("modal-bg").addEventListener("click", () => {
    modal.style.display = "none"
})

document.getElementById("modal-close").addEventListener("click", () => {
    modal.style.display = "none"
})

