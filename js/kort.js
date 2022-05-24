const areas = document.querySelectorAll('.kort-area');
const mainMap = document.getElementById("kort-alt");
const arrows = document.querySelectorAll('.arrow-back');

let currentMap;
let currentArea;

areas.forEach(area => {
    area.addEventListener("click", function(){
        currentMap = "area-" + this.dataset.area;
        currentArea = "kort-" + this.dataset.area;
        const curMap = document.getElementById(currentMap)
        curMap.style.display = "flex";
        zoomIn(this)
    })
})

arrows.forEach(arrow => {
    arrow.addEventListener("click", function(){
        const dur = 200;
        const curMap = document.getElementById(currentMap)
        curMap.animate(
            [
                {opacity: "0"}
            ],
            {
                fill: "forwards",
                duration: dur,
                easing: "ease"
            }
        )
        setTimeout(() => {
            curMap.style.display = "none";
            zoomOut()
        }, dur);
    })
})

function zoomIn(area) {
    const dur = 600;
    const curMap = document.getElementById(currentMap);
    curMap.style.display = "flex;"
    switch (area.dataset.area) {
        case "oe":
            mainMap.animate(
                [
                    {transform: "translate(-145%, 133%) scale(4.5)"}
                ],
                {
                    fill: "forwards",
                    duration: dur,
                    easing: "ease-in-out"
                }
            )
            break;

        case "aa":
            mainMap.animate(
                [
                    {transform: "translate(22%, 18%) scale(4.2)"}
                ],
                {
                    fill: "forwards",
                    duration: dur,
                    easing: "ease"
                }
            ) 
            break;

        case "x":
            mainMap.animate(
                [
                    {transform: "translate(20%, -62%) scale(2.4)"}
                ],
                {
                    fill: "forwards",
                    duration: dur,
                    easing: "ease"
                }
            ) 
            break;
    
        default:
            break;
    }
    setTimeout(() => {
        area.animate(
            [
                {opacity: "0"}
            ],
            {
                fill: "forwards",
                duration: 100,
                easing: "ease"
            }
        )
        curMap.animate(
            [
                {opacity: "1"}
            ],
            {
                fill: "forwards",
                duration: 100,
                easing: "ease"
            }
        )
    }, dur-100);
}

function zoomOut() {
    const curArea = document.getElementById(currentArea);
    curArea.animate(
        [
            {opacity: "1"}
        ],
        {
            fill: "forwards",
            duration: 100,
            easing: "ease"
        }
    ) 
    mainMap.animate(
        [
            {transform: "scale(1) translate(0%, 0%)"}
        ],
        {
            fill: "forwards",
            duration: 400,
            easing: "ease"
        }
    )
    
}

const oeLocations = document.getElementById('oe-locations');
const aaLocations = document.getElementById('aa-locations');
const xLocations = document.getElementById('x-locations');

let pinCoords = {
    oe: [
        {name: "isbjerget", top: "30%", left: "78%"},
        {name: "bassin-7", top: "45%", left: "63%"},
        {name: "torvet", top: "43%", left: "30%"}
    ],
    aa: [
        {name: "klostertorv", top: "20%", left: "43%"},
        {name: "åen", top: "43%", left: "55%"},
        {name: "ryesgade", top: "71%", left: "39%"}
    ],
    x: [
        {name: "godsbanen", top: "16%", left: "29%"},
        {name: "ridehuset", top: "22%", left: "47%"},
        {name: "tangkrogen", top: "74%", left: "67%"}
    ]
}

pinCoords.oe.forEach(location => {
    oeLocations.appendChild(createPin(location));
})
pinCoords.aa.forEach(location => {
    aaLocations.appendChild(createPin(location));
})
pinCoords.x.forEach(location => {
    xLocations.appendChild(createPin(location));
})

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
    div.appendChild(p);
    div.appendChild(pin);
    return div;
}



