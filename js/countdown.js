// Dato vi tæller til
let countDownDate = new Date("Jun 7, 2023 12:00:00").getTime();

// opdaterer countdown hvert sekund
let x = setInterval(function() {

  // få dagens dato og tid
  let now = new Date().getTime();
    
  // finder forskellen på de to datoer
  let distance = countDownDate - now;
    
  // udregning for dage, timer, minutter og sekunder
  // tierne i sekunder, minutter og timer fås også
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  let secTens = Math.floor(seconds/10)
  let minTens = Math.floor(minutes/10)
  let hourTens = Math.floor(hours/10)

  // tilføjer et 0 foran timer, minutter og sekunder hvis de er under 9, for altid at have to cifre
  if (hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds <= 9) {
    seconds = "0" + seconds;
  }
    
  // outputter resultatet til HTML elementer
  document.getElementById("countdown-days").innerText = days;
  document.getElementById("countdown-hours-tens").innerText = hourTens;
  document.getElementById("countdown-hours").innerText = hours.toString()[1];
  document.getElementById("countdown-mins-tens").innerText = minTens;
  document.getElementById("countdown-mins").innerText = minutes.toString()[1];
  document.getElementById("countdown-secs-tens").innerText = secTens;
  document.getElementById("countdown-secs").innerText = seconds.toString()[1];
  
}, 1000);