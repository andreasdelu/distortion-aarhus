const imgUrl = "../images/artister/cropped/";
const modal = document.getElementById('artist-popup');

async function fetchArtists() {
    const res = await fetch("../program/artists.json");
    const artists = await res.json();
    return artists;
}

fetchArtists()
.then(data => populateDays(data))

function populateDays(artists){
    const artistsFriday = document.querySelector('.friday');
    const artistsSaturday = document.querySelector('.saturday');
    const artistsSunday = document.querySelector('.sunday');
    artists.friday.forEach(artist => {
        artistsFriday.appendChild(createArtist(artist))
    });
    artists.saturday.forEach(artist => {
        artistsSaturday.appendChild(createArtist(artist))
    });
    artists.sunday.forEach(artist => {
        artistsSunday.appendChild(createArtist(artist))
    });

}

const artistTemp = document.getElementById("artist-temp")

function createArtist(artist){
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

document.getElementById("modal-bg").addEventListener("click", () => {
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
