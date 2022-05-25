// NAVBAR LOGIK vvvv

const burger = document.getElementById('burger-container');
const navmenu = document.getElementById('navmenu');

const toggleMode = document.getElementById('mode-toggle');
const toggleContainer = document.querySelector(".toggle-container");

//checker om brugeren har en preference for farvetema eller om brugeren tidligere har valgt et farvetema der er gemt i sessionStorage
if (sessionStorage.getItem("mode") == null) {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleContainer.classList.toggle("toggled")
    document.body.classList.toggle("dark-mode")
  }
  else{
    sessionStorage.setItem("mode", "light")
  }
}

if (sessionStorage.getItem("mode") == "dark") {
  toggleContainer.classList.add("toggled")
  document.body.classList.add("dark-mode")
}
else if (sessionStorage.getItem("mode") == "light"){
  toggleContainer.classList.remove("toggled")
  document.body.classList.remove("dark-mode")
}

//Lytter efter om brugeren klikker på farvetemaknappen og skifter derefter farvetemaet

toggleMode.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    sessionStorage.setItem("mode", "light")
  }
  else{
    sessionStorage.setItem("mode", "dark")
  }
  toggleContainer.classList.toggle("toggled")
  document.body.classList.toggle("dark-mode")
})


//Viser menuen når brugeren klikker på burgerikonet
//animerer burgerikonets linjer ved at tilføje eller fjerne classes
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