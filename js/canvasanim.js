
const ticketAnim = document.getElementById("ticketanim");
const tCtx = ticketAnim.getContext("2d");
const mapAnim = document.getElementById("kortanim");
const mCtx = mapAnim.getContext("2d");

const scrollOffset = 400
const mapScrollOffset = 350;


window.addEventListener("scroll", () => {
    requestAnimationFrame(checkTicketScroll);
    requestAnimationFrame(checkMapScroll);
})


let ticketUrl = "../images/ticketseq/webp/ticketanim"
let mapUrl = "../images/kortanimseq/kortanim"

const ticketFrames = 142;
const mapFrames = 91;

function preloadImages() {
    for (let i = 1; i < ticketFrames; i++) {
        const img = new Image()
        img.src = ticketUrl + i.toString().padStart(3, "0") + ".webp";
    }
    for (let i = 1; i < mapFrames; i++) {
        const img = new Image()
        img.src = mapUrl + i.toString().padStart(2, "0") + ".webp";
    }
}

const ticketImg = new Image()
ticketImg.src = ticketUrl + "000.webp"
ticketAnim.width = 500;
ticketAnim.height = 500;
ticketImg.onload = () => {
    tCtx.drawImage(ticketImg, 0, 0)
}

function updateTicketCanvas(i) {
    ticketImg.src = ticketUrl + i.toString().padStart(3, "0") + ".webp";
    ticketImg.onload = () => {
        tCtx.drawImage(ticketImg, 0, 0)
    }
}

function checkTicketScroll() {
    if(scrollY + scrollOffset <= billetter.offsetTop){
        requestAnimationFrame(() => updateTicketCanvas(0))
    }
    if (scrollY + scrollOffset >= billetter.offsetTop) {
        const diff = Math.floor((scrollY + scrollOffset - billetter.offsetTop)/2.8)
        if(scrollY + scrollOffset > billetter.offsetTop + billetter.offsetHeight){
            requestAnimationFrame(() => updateTicketCanvas(141))
            return;
        }
        if (diff >= 0 && diff <= 141) {
            requestAnimationFrame(() => updateTicketCanvas(diff))
        }
    }
}

const mapImg = new Image()
mapImg.src = mapUrl + "00.webp"
mapAnim.width = 500;
mapAnim.height = 500;
mapImg.onload = () => {
    mCtx.drawImage(mapImg, 0, 0)
}

function updateMapCanvas(i) {
    mapImg.src = mapUrl + i.toString().padStart(2, "0") + ".webp";
    mapImg.onload = () => {
        mCtx.drawImage(mapImg, 0, 0)
    }
}

function checkMapScroll() {
    if(scrollY + mapScrollOffset <= kort.offsetTop){
        requestAnimationFrame(() => updateMapCanvas(0))
    }
    if (scrollY + mapScrollOffset >= kort.offsetTop) {
        const diff = Math.floor((scrollY + mapScrollOffset - kort.offsetTop)/4)
        if(scrollY + mapScrollOffset > kort.offsetTop + kort.offsetHeight){
            requestAnimationFrame(() => updateMapCanvas(90))
            return;
        }
        if (diff >= 0 && diff <= 90) {
            requestAnimationFrame(() => updateMapCanvas(diff))
        }
    }
}

preloadImages()

requestAnimationFrame(checkTicketScroll);
requestAnimationFrame(checkMapScroll);
