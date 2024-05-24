// JavaScript to redirect to index.html after 10 seconds
var countdown = 10;
var clockDisplay = document.getElementById("clock");

function updateClock() {
    clockDisplay.textContent = "Countdown: " + countdown + " seconds";
    countdown--;
    if (countdown < 0) {
        window.location.href = "index.html";
    } else {
        setTimeout(updateClock, 1000);
    }
}

updateClock();