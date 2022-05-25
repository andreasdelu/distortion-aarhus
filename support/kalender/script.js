const today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear()
let monthName = new Date().toLocaleString('default', {month: 'long'});

const monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
  "Juli", "August", "September", "Oktober", "November", "December"
];
const dayNames = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];

const monthYear = document.querySelector('.month-year');

monthYear.innerText = monthNames[currentMonth - 1] + ' ' + currentYear;

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

const calenderGrid = document.querySelector(".calender-grid")

function populateDays() {
    let max = getDaysInMonth(currentYear, currentMonth);
    monthYear.innerText = monthNames[currentMonth - 1] + ' ' + currentYear;
    calenderGrid.innerHTML = '';
    for (let day = 1; day < max + 1; day++) {
        const date = document.createElement('div');
        date.dataset.key = day;
        date.dataset.events = '';
        date.classList.add("date");
        if (today.getDate() == day && today.getFullYear() == currentYear && today.getMonth() + 1 == currentMonth) {
            date.classList.add("current")
        }
        calenderGrid.appendChild(date)
        date.innerText = day;

        let dateStr = currentYear + "-" + currentMonth + "-" + day;
        var d = new Date(dateStr);
        date.dataset.dayName = dayNames[d.getDay()];

        const div = document.createElement("div");
        div.classList.add("dayname");
        div.innerText = date.dataset.dayName;
        date.appendChild(div)
    }

    let remainingDays = 35 - max;

    for (let day = 1; day < remainingDays + 1; day++) {
        const date = document.createElement('div');
        date.classList.add("date");
        date.classList.add("next-month")
        calenderGrid.appendChild(date)
        date.innerText = day;
    }
    checkForEvents();
    document.querySelectorAll(".next-month").forEach(next => {
        next.addEventListener("click", nextMonth)
    })
}

function addDayNames(){
    var days = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
    document.querySelectorAll(".date").forEach(date => {
        let day = date.dataset.key;
        let dateStr = currentYear + "-" + currentMonth + "-" + day;
        var d = new Date(dateStr);
        date.dataset.dayName = days[d.getDay()];

        const div = document.createElement("div");
        div.classList.add("dayname");
        div.innerText = date.dataset.dayName;
        date.appendChild(div)

    })

}

const description = document.getElementById('description');
const descriptionBackground = document.getElementById('desc-background');

descriptionBackground.addEventListener("click", removeDescription)

document.getElementById("calender").addEventListener("click", () => {
    if (description.innerHTML !== '') {
        return;
    }
    description.innerHTML = '';
})

async function checkForEvents() {
    const descTemp = document.getElementById('desc-temp');
    const events = await getEvents();
    const dates = document.querySelectorAll('.date');
    dates.forEach(elem => {
        const date = `${elem.dataset.key}-${currentMonth}-${currentYear}`;
        events.forEach(event => {
            if (event.date == date) {
                elem.classList.add("has-event")
                elem.addEventListener("click", () => {
                    description.style.display="block"
                    const clone = descTemp.content.cloneNode(true);
                    clone.querySelector(".desc-date").innerHTML += event.date;
                    clone.querySelector(".desc-time").innerHTML += event.time;
                    clone.querySelector(".desc-info").innerHTML += event.info;
                    clone.querySelector(".desc-name").innerHTML += event.description;
                    clone.querySelector(".desc-hashtags").innerHTML += event.hashtags;
                    clone.querySelector(".desc-platform").innerHTML += event.platform;
                    clone.querySelector(".desc-type").innerHTML += event.type;
                    clone.querySelector(".desc-creator").innerHTML += event.creator;
                    event.content.forEach(item => {
                        if (event.type == "Billede") {
                            const img = document.createElement("img");
                            img.classList.add("content");
                            img.src = "../images/" + item;
                            clone.querySelector(".desc-content").appendChild(img);
                        }
                        else if(event.type == "Video") {
                            const video = document.createElement("video");
                            video.controls = "controls";
                            video.classList.add("content");
                            const source = document.createElement("source");
                            source.src = "../videos/" + item;
                            source.type = "video/mp4";
                            video.appendChild(source)
                            clone.querySelector(".desc-content").appendChild(video);
                        }
                        else{
                            removeDescription();
                            throw new Error(event.type + " is not an allowed type")
                        }
                    })
                    description.appendChild(clone);
                    descriptionBackground.style.display = "block"
                    document.getElementById("desc-close").addEventListener("click", removeDescription)

                })
            }
        });
    })
}

function removeDescription() {
    description.querySelectorAll(".desc-container").forEach(cont => {
        cont.remove();
    })
    description.style.display="none"
    descriptionBackground.style.display = "none"
}


async function getEvents() {
    const res = await fetch('events.json');
    const data = await res.json()
    return await data;
}

populateDays();

document.getElementById("month-back").addEventListener("click", prevMonth)
document.getElementById("month-next").addEventListener("click", nextMonth)
window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key == "ArrowLeft") {
        prevMonth();
    }
    if (e.key == "ArrowRight") {
        nextMonth();
    }
    if (e.key == "ArrowUp") {
        currentYear++;
        populateDays();
    }
    if (e.key == "ArrowDown") {
        currentYear--;
        populateDays();
    }
})

function nextMonth() {
    currentMonth++
    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++
    }
    populateDays();
}

function prevMonth() {
    currentMonth--;
    if(currentMonth < 1){
        currentMonth = 12;
        currentYear--
    }
    populateDays();
}

