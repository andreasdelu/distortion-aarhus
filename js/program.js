
const imgUrl = "../images/artister/cropped/"

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
    const name = clone.querySelector(".artist-name");
    const img = clone.querySelector(".artist-pic");
    const time = clone.querySelector(".artist-time");

    name.innerText = artist.name;
    img.src = imgUrl + artist.img;
    img.alt = artist.name;
    time.innerText = artist.time;

    return clone;
}