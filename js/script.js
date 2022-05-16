const outlines = document.querySelectorAll('.section-title-outline');
const karrusselTop = document.querySelector(".karrussel-top")
const karrusselBot = document.querySelector(".karrussel-bot")
const ticketAnim = document.getElementById("ticketanim");
const ctx = ticketAnim.getContext("2d");

const scrollOffset = 400


window.addEventListener("scroll", () => {
    outlines[0].style.top = (document.getElementById("program").offsetTop - scrollY-200)/37 + "%";
    outlines[1].style.top = (document.getElementById("billetter").offsetTop - scrollY+200)/34 + "%";
    outlines[2].style.top = (document.getElementById("kort").offsetTop - scrollY-200)/35 + "%";
    outlines[3].style.top = (document.getElementById("merch").offsetTop - scrollY+200)/34 + "%";

    karrusselTop.style.backgroundPositionX = 100 + scrollY/20 + "%"
    karrusselBot.style.backgroundPositionX = "-" + scrollY/20 + "%"

    if (scrollY + scrollOffset >= document.getElementById("billetter").offsetTop) {
        const diff = Math.floor((scrollY + scrollOffset - document.getElementById("billetter").offsetTop)/2.8)
        if (diff >= 0 && diff <= 142) {
            requestAnimationFrame(updateCanvas(diff))
        }
    }
    if(scrollY + scrollOffset > document.getElementById("billetter").offsetTop + document.getElementById("billetter").offsetHeight){
        requestAnimationFrame(updateCanvas(141))
    }
    if(scrollY + scrollOffset < document.getElementById("billetter").offsetTop){
        requestAnimationFrame(updateCanvas(0))
    }

})

let ticketUrl = "../images/ticketseq/ticketanim"

const frames = 142

function preloadImages() {
    for (let i = 1; i < frames; i++) {
        const img = new Image()
        img.src = ticketUrl + i.toString().padStart(3, "0") + ".jpg";
    }
}

preloadImages()

const img = new Image()
img.src = ticketUrl + "000.jpg"
ticketAnim.width = 500;
ticketAnim.height = 500;
img.onload = () => {
    ctx.drawImage(img, 0, 0)
}

function updateCanvas(i) {
    img.src = ticketUrl + i.toString().padStart(3, "0") + ".jpg";
    img.onload = () => {
        ctx.drawImage(img, 0, 0)
    }
}



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