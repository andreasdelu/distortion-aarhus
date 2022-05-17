const outlines = document.querySelectorAll('.section-title-outline');
const karrusselTop = document.querySelector(".karrussel-top")
const karrusselBot = document.querySelector(".karrussel-bot")
const ticketAnim = document.getElementById("ticketanim");
const ctx = ticketAnim.getContext("2d");

const program = document.getElementById('program');
const billetter = document.getElementById('billetter');
const kort = document.getElementById('kort');
const merch = document.getElementById('merch');

const scrollOffset = 400


window.addEventListener("scroll", () => {
    
    requestAnimationFrame(outlineScroll)
    requestAnimationFrame(karrusselScroll)
    requestAnimationFrame(checkScroll);

})

function karrusselScroll() {
    karrusselTop.style.backgroundPositionX = 100 + scrollY/20 + "%"
    karrusselBot.style.backgroundPositionX = "-" + scrollY/20 + "%"
}

function outlineScroll() {
    outlines[0].style.top = (program.offsetTop - scrollY-200)/37 + "%";
    outlines[1].style.top = (billetter.offsetTop - scrollY+200)/34 + "%";
    outlines[2].style.top = (kort.offsetTop - scrollY-200)/35 + "%";
    outlines[3].style.top = (merch.offsetTop - scrollY+200)/34 + "%";
}


let ticketUrl = "../images/ticketseq/webp/ticketanim"

const frames = 142

function preloadImages() {
    for (let i = 1; i < frames; i++) {
        const img = new Image()
        img.src = ticketUrl + i.toString().padStart(3, "0") + ".webp";
    }
}

const img = new Image()
img.src = ticketUrl + "000.webp"
ticketAnim.width = 500;
ticketAnim.height = 500;
img.onload = () => {
    ctx.drawImage(img, 0, 0)
}

function updateCanvas(i) {
    img.src = ticketUrl + i.toString().padStart(3, "0") + ".webp";
    img.onload = () => {
        ctx.drawImage(img, 0, 0)
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

requestAnimationFrame(outlineScroll)
requestAnimationFrame(karrusselScroll)
requestAnimationFrame(checkScroll);



/* let options = {
    rootMargin: '0px',
    threshold: 0.75
  }

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
          let elem = entry.target;
          elem.play();
          observer.unobserve(ticketAnim)
        }
      });
}, options)


observer.observe(ticketAnim); */