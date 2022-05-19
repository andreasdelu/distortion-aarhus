
const ticketAnim = document.getElementById("ticketanim");
const tCtx = ticketAnim.getContext("2d");
const mapAnim = document.getElementById("kortanim");
const mCtx = mapAnim.getContext("2d");


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

preloadImages()

function buildThresholdList(frames) {
    let thresholds = [];
    let numSteps = frames * 2;
  
    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }


function canvasCallback(entries, canvas, frames) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let frame = Math.floor(entry.intersectionRatio * frames - 1)
            frame = (frame <= 0) ? 0 : frame
            if (canvas == "ticket") {
                if (entry.boundingClientRect.top <= 0) {
                    requestAnimationFrame(() => updateTicketCanvas(frames - 1))
                    return;
                }
                requestAnimationFrame(() => updateTicketCanvas(frame))
                return;
            }
            if (entry.boundingClientRect.top <= 0) {
                requestAnimationFrame(() => updateMapCanvas(frames - 1))
                return;
            }
            requestAnimationFrame(() => updateMapCanvas(frame))
            
        }
    });
}

const ticketObserver = new IntersectionObserver((entries) => {
    canvasCallback(entries, "ticket", ticketFrames)
}, 
{
    rootMargin: '0% 0px -20% 0px', 
    threshold: buildThresholdList(ticketFrames)
})
const mapObserver = new IntersectionObserver((entries) => {
    canvasCallback(entries, "map", mapFrames)
},
{
    rootMargin: '0% 0px -25% 0px', 
    threshold: buildThresholdList(mapFrames)
})

ticketObserver.observe(ticketAnim)
mapObserver.observe(mapAnim)

