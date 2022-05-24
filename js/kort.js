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