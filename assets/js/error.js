//error page countdown
document.addEventListener('DOMContentLoaded', function () {
    let countdown = 5;
    const clockDisplay = document.getElementById('clock');

    function updateClock() {
        clockDisplay.textContent = `Countdown: ${countdown} seconds`;
        countdown--;
        if (countdown < 0) {
            window.location.href = "index.html";
        } else {
            setTimeout(updateClock, 1000);
        }
    }
    updateClock();
}); 

// Dark mode / Light mode toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');

    // Check the local storage for dark mode state
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleDarkModeBtn.textContent = 'Light Mode';
    } else {
        toggleDarkModeBtn.textContent = 'Dark Mode';
    }

    // Add event listener to the button
    toggleDarkModeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        // Save the current mode to local storage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            this.textContent = 'Light Mode';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            this.textContent = 'Dark Mode';
        }
    });
});
