const outlines = document.querySelectorAll('.section-title-outline');

window.addEventListener("scroll", () => {
    outlines[0].style.top = (document.getElementById("program").offsetTop - scrollY-200)/37 + "%";
    outlines[1].style.top = (document.getElementById("billetter").offsetTop - scrollY+200)/34 + "%";
    outlines[2].style.top = (document.getElementById("kort").offsetTop - scrollY-200)/35 + "%";
})