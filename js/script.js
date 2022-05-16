const outlines = document.querySelectorAll('.section-title-outline');
const karrusselTop = document.querySelector(".karrussel-top")
const karrusselBot = document.querySelector(".karrussel-bot")

window.addEventListener("scroll", () => {
    outlines[0].style.top = (document.getElementById("program").offsetTop - scrollY-200)/37 + "%";
    outlines[1].style.top = (document.getElementById("billetter").offsetTop - scrollY+200)/34 + "%";
    outlines[2].style.top = (document.getElementById("kort").offsetTop - scrollY-200)/35 + "%";
    outlines[3].style.top = (document.getElementById("merch").offsetTop - scrollY+200)/34 + "%";

    karrusselTop.style.backgroundPositionX = 100 + scrollY/20 + "%"
    karrusselBot.style.backgroundPositionX = "-" + scrollY/20 + "%"
})