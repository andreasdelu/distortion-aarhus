// Set the date we're counting down to
var countDownDate = new Date("Jun 7, 2023 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var secTens = Math.floor(seconds/10)
  var minTens = Math.floor(minutes/10)
  var hourTens = Math.floor(hours/10)


  if (hours <= 9) {
    hours = "0" + hours;
  }
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds <= 9) {
    seconds = "0" + seconds;
  }
    
  // Output the result in an element with id="nedtaelling"
  document.getElementById("countdown-days").innerText = days;
  document.getElementById("countdown-hours-tens").innerText = hourTens;
  document.getElementById("countdown-hours").innerText = hours.toString()[1];
  document.getElementById("countdown-mins-tens").innerText = minTens;
  document.getElementById("countdown-mins").innerText = minutes.toString()[1];
  document.getElementById("countdown-secs-tens").innerText = secTens;
  document.getElementById("countdown-secs").innerText = seconds.toString()[1];
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);