const outlines = document.querySelectorAll('.section-title-outline');
const karrusselTop = document.querySelector(".karrussel-top")
const karrusselBot = document.querySelector(".karrussel-bot")
const karrusselMerchTop = document.querySelector(".karrussel-merch-top")
const karrusselMerchBot = document.querySelector(".karrussel-merch-bot")

const program = document.getElementById('program');
const billetter = document.getElementById('billetter');
const kort = document.getElementById('kort');
const merch = document.getElementById('merch');


window.addEventListener("scroll", () => {
    
    requestAnimationFrame(outlineScroll)
    requestAnimationFrame(karrusselScroll)

})

function karrusselScroll() {
    karrusselTop.style.backgroundPositionX = 100 + scrollY/20 + "%"
    karrusselBot.style.backgroundPositionX = "-" + scrollY/20 + "%"
    karrusselMerchBot.style.backgroundPositionX = 100 + scrollY/20 + "%"
    karrusselMerchTop.style.backgroundPositionX = "-" + scrollY/20 + "%"
}

function outlineScroll() {
    outlines[0].style.top = (program.offsetTop - scrollY-200)/37 + "%";
    outlines[1].style.top = (billetter.offsetTop - scrollY+200)/34 + "%";
    outlines[2].style.top = (kort.offsetTop - scrollY-200)/35 + "%";
    outlines[3].style.top = (merch.offsetTop - scrollY+200)/34 + "%";
}

requestAnimationFrame(outlineScroll)
requestAnimationFrame(karrusselScroll)