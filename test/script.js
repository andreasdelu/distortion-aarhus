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
    
  // Output the result in an element with id="nedtaelling"
  document.getElementById("countdown-days").innerText = days;
  document.getElementById("countdown-hours").innerText = hours;
  document.getElementById("countdown-mins").innerText = minutes;
  document.getElementById("countdown-secs").innerText = seconds;
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);