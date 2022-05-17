
const ticketAnim = document.getElementById("ticketanim");
const ctx = ticketAnim.getContext("2d");

const billetter = document.getElementById('billetter');

const scrollOffset = 400


window.addEventListener("scroll", () => {
    requestAnimationFrame(checkScroll);
})


let ticketUrl = "../images/ticketseq/webp/ticketanim"

const ticketFrames = 142

function preloadImages() {
    for (let i = 1; i < ticketFrames; i++) {
        const img = new Image()
        img.src = ticketUrl + i.toString().padStart(3, "0") + ".webp";
    }
}

const ticketImg = new Image()
ticketImg.src = ticketUrl + "000.webp"
ticketAnim.width = 500;
ticketAnim.height = 500;
ticketImg.onload = () => {
    ctx.drawImage(ticketImg, 0, 0)
}

function updateCanvas(i) {
    ticketImg.src = ticketUrl + i.toString().padStart(3, "0") + ".webp";
    ticketImg.onload = () => {
        ctx.drawImage(ticketImg, 0, 0)
    }
}

function checkScroll() {
    if(scrollY + scrollOffset <= billetter.offsetTop){
        requestAnimationFrame(updateCanvas(0))
    }
    if (scrollY + scrollOffset >= billetter.offsetTop) {
        const diff = Math.floor((scrollY + scrollOffset - billetter.offsetTop)/2.8)
        if(scrollY + scrollOffset > billetter.offsetTop + billetter.offsetHeight){
            requestAnimationFrame(updateCanvas(141))
            return;
        }
        if (diff >= 0 && diff <= 142) {
            requestAnimationFrame(updateCanvas(diff))
        }
    }
}

preloadImages()

requestAnimationFrame(checkScroll);
