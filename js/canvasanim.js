// Her sættes canvaselementerne på variabler, og jeg får også deres getContext("2d") sat på en variabel

const ticketAnim = document.getElementById("ticketanim");
const tCtx = ticketAnim.getContext("2d");
const mapAnim = document.getElementById("kortanim");
const mCtx = mapAnim.getContext("2d");


let ticketUrl = "images/ticketseq/ticketanim"
let mapUrl = "images/kortanimseq/kortanim"

// Antallet af frames i hver animation bliver tildelt variabler

const ticketFrames = 142;
const mapFrames = 91;

// Loader først alle billeder så animationen ikke lagger

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

// Tegner billet animationens første billede på canvas elementet

const ticketImg = new Image()
ticketImg.src = ticketUrl + "000.webp"
ticketAnim.width = 500;
ticketAnim.height = 500;
ticketImg.onload = () => {
    tCtx.drawImage(ticketImg, 0, 0)
}

// Opdaterer canvas elementet ved at slette det forrige billede og tegne et nyt billede
// Tager et tal (frame) som parameter

function updateTicketCanvas(i) {
    ticketImg.src = ticketUrl + i.toString().padStart(3, "0") + ".webp";
    ticketImg.onload = () => {
        tCtx.clearRect(0, 0, ticketAnim.width, ticketAnim.height);
        tCtx.drawImage(ticketImg, 0, 0)
    }
}

// Tegner kort animationens første billede på canvas elementet

const mapImg = new Image()
mapImg.src = mapUrl + "00.webp"
mapAnim.width = 500;
mapAnim.height = 500;
mapImg.onload = () => {
    mCtx.drawImage(mapImg, 0, 0)
}

// Opdaterer canvas elementet ved at slette det forrige billede og tegne et nyt billede
// Tager et tal (frame) som parameter

function updateMapCanvas(i) {
    mapImg.src = mapUrl + i.toString().padStart(2, "0") + ".webp";
    mapImg.onload = () => {
        mCtx.clearRect(0, 0, mapAnim.width, mapAnim.height);
        mCtx.drawImage(mapImg, 0, 0)
    }
}

preloadImages()


// Laver et array af thresholdværdier, der passer med antallet af frames i animationen.
// Elementet bliver derfor opdelt i et antal segmenter der er lig med disse frames.

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

// Callbackfunktionen der bliver brugt af de to IntersectionObservers
// Først checkes elementets intersectionRatio, som er givet af thresholdlisten og bliver gjort relativ antallet af frames i animationen
// Derefter checkes der om frame variablen er under eller lig 0.
// Hvis dette er tilfældet, sættes den tilbage til 0 for at funktionen ikke prøver at tegne et billede der ikke findes.
// Så checkes der om det givne parameter "canvas" er "ticket" eller ej.
// Hvis dette er tilfældet checkes der om elementet er under brugerens viewport: (entry.boundingClientRect.top <= 0) så sættes animationen til den sidste frame (fordi antallet af billeder i animationen går ned til 0 og antal frames kun går ned til 1)
// bruges requestAnimationFrame til at kalde updateTicketCanvas med "frames" parametret - 1 (for at få det sidste billede)
// Hvis "canvas" ikke er "ticket" kan det kun være "map" som gør det samme med updateMapCanvas


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

// Her opsættes to IntersectionObservers der gør brug af canvasCallback funktionen og buildThresholdList funktionen

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

