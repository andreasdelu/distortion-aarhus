const imgUrl = "../images/artister/cropped/";
const modal = document.getElementById('artist-popup');

const artistsFriday = document.querySelector('.friday');
const artistsSaturday = document.querySelector('.saturday');
const artistsSunday = document.querySelector('.sunday');
const listFriday = document.querySelector('.list-friday');
const listSaturday = document.querySelector('.list-saturday');
const listSunday = document.querySelector('.list-sunday');

async function fetchArtists() {
    const res = await fetch("../program/artists.json");
    const artists = await res.json();
    return artists;
}

fetchArtists()
.then(data => populateDays(data))

function populateDays(artists){
    artists.friday.forEach(artist => {
        artistsFriday.appendChild(createGridArtist(artist))
        listFriday.appendChild(createListArtist(artist))
    });
    artists.saturday.forEach(artist => {
        artistsSaturday.appendChild(createGridArtist(artist))
        listSaturday.appendChild(createListArtist(artist))
    });
    artists.sunday.forEach(artist => {
        artistsSunday.appendChild(createGridArtist(artist))
        listSunday.appendChild(createListArtist(artist))
    });

}

const artistTemp = document.getElementById("artist-temp")
const listTemp = document.getElementById("list-temp")

function createGridArtist(artist){
    const clone = artistTemp.content.cloneNode(true);
    const div = clone.querySelector(".artist");
    const name = clone.querySelector(".artist-name");
    const img = clone.querySelector(".artist-pic");
    const time = clone.querySelector(".artist-time");

    name.innerText = artist.name;
    img.src = imgUrl + artist.img;
    img.alt = artist.name;
    time.innerText = artist.time;

    div.addEventListener("click", () => {
        createModal(artist);
    })

    return clone;
}

function createListArtist(artist){
    const clone = listTemp.content.cloneNode(true);
    const div = clone.querySelector(".list-item");
    const name = clone.querySelector(".list-name");
    const time = clone.querySelector(".list-time");

    name.innerText = artist.name;
    time.innerText = artist.day + " · " + artist.time;

    div.addEventListener("click", () => {
        createModal(artist);
    })

    return clone;
}

document.getElementById("modal-bg").addEventListener("click", () => {
    modal.style.display = "none"
})

document.getElementById("modal-close").addEventListener("click", () => {
    modal.style.display = "none"
})

function createModal(artist) {
    document.getElementById("readmore").style.display = "block";
    document.getElementById("modal-info").style.height = "";
    document.getElementById("modal-info").style.paddingBottom = "";

    const img = document.getElementById("modal-img");
    const name = document.getElementById("modal-name");
    const embed = document.getElementById("modal-embed");
    const date = document.getElementById("modal-date");
    const location = document.getElementById("modal-location");
    const info = document.getElementById("modal-info");

    img.style.backgroundImage = `url(${imgUrl}${artist.img})`
    name.innerText = artist.name
    embed.src = `https://open.spotify.com/embed/artist/${artist.embed}?utm_source=generator&theme=0`
    date.innerText = artist.day + " · " + artist.time
    location.innerText = artist.location;
    info.innerText = artist.info

    modal.style.display = "flex";
}

document.getElementById("readmore-text").addEventListener("click", readMore)

function readMore() {
    document.getElementById("readmore").style.display = "none";
    document.getElementById("modal-info").style.height = "fit-content";
    document.getElementById("modal-info").style.paddingBottom = "25px";

}

const listBtn = document.getElementById('pref-list');
const arrayBtn = document.getElementById('pref-array');

listBtn.addEventListener("click", () => {
    arrayBtn.classList.toggle("current-pref")
    listBtn.classList.toggle("current-pref")
    artistsFriday.style.display = "none"
    artistsSaturday.style.display = "none"
    artistsSunday.style.display = "none"
    listFriday.style.display = "block"
    listSaturday.style.display = "block"
    listSunday.style.display = "block"
})
arrayBtn.addEventListener("click", () => {
    arrayBtn.classList.toggle("current-pref")
    listBtn.classList.toggle("current-pref")
    artistsFriday.style.display = "grid"
    artistsSaturday.style.display = "grid"
    artistsSunday.style.display = "grid"
    listFriday.style.display = "none"
    listSaturday.style.display = "none"
    listSunday.style.display = "none"
})
