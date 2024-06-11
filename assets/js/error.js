document.addEventListener("DOMContentLoaded", function() {
    // Initialize countdown variable
    let countdown = 10;
    const clockDisplay = document.getElementById("clock");

    function updateClock() {
      // Update the text content of the clockDisplay element to show the current countdown value
      clockDisplay.textContent = "Countdown: " + countdown + " seconds";

      // Decrement the countdown value by 1
      countdown--;

      // Check if the countdown has reached below 0
      if (countdown < 0) {
        // If countdown is below 0, redirect the browser to "index.html"
        window.location.href = "index.html";
      } else {
        // If countdown is not below 0, call updateClock again after 1000 milliseconds (1 second)
        setTimeout(updateClock, 1000);
      }
    }

    // Start the countdown
    updateClock();
  });
