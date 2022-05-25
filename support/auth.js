const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submit = document.getElementById('submit');
const loginForm = document.getElementById('login-form');

let username;
let password;

async function getDetails(){
    const res = await fetch("https://api.jsonbin.io/b/62611648bc312b30ebea6329/1");
    const data = await res.json();
    username = await data.username;
    password = await data.password;
}

getDetails();

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!passwordInput.value || !usernameInput.value) return;

    if (passwordInput.value === password && usernameInput.value === username) {
        sessionStorage.setItem("isLoggedIn", true);
        location = "../support";
    }
    else{
        usernameInput.value = null;
        passwordInput.value = null;
        console.log("wrong pass or user")
    }

})