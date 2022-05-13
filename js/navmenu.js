const burger = document.getElementById('burger-container');
const navmenu = document.getElementById('navmenu');

burger.addEventListener("click", () => {
    if (navmenu.style.display == "flex") {
        burger.setAttribute("class", "after-menu");
        document.body.style.overflowY = "auto"
        navmenu.style.display = "none"
        navmenu.style.right = "-100%"
        document.getElementById("top-line").classList.remove("top-line")
        document.getElementById("mid-line").classList.remove("mid-line")
        document.getElementById("bot-line").classList.remove("bot-line")
    }
    else{
        navmenu.style.display = "flex"
        setTimeout(() => {
            navmenu.style.right = "0"
        }, 20);
        document.body.style.overflowY = "hidden"
        burger.setAttribute("class", "after-close");
        document.getElementById("top-line").classList.add("top-line")
        document.getElementById("mid-line").classList.add("mid-line")
        document.getElementById("bot-line").classList.add("bot-line")
    }
})