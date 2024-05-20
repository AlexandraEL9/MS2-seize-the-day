//variables
let isPaused = true; //timer starts in paused state
let timer; //variable to hold timer interval
let minutes = 25; //initial mins set to 25
let seconds = 0;

//references to html elements to do with displaying time (mins and secs)
const minutesElement = document.getElementById('minutes');

//current date section
// Function to update the current date
function updateDate() {
    const currentDate = new Date(); // Get the current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options); // Format the date

    // Get the element where the date will be displayed
    const currentDateElement = document.getElementById('currentDate');

    // Set the text content of the element to the formatted date
    currentDateElement.textContent = formattedDate;
}

// Function to update the date continuously
function updateDateContinuously() {
    updateDate(); // Call updateDate immediately to set the initial date

    // Set up an interval to update the date every second
    setInterval(function() {
        const currentDate = new Date(); // Get the current date
        const currentDay = currentDate.getDate(); // Get the current day

        // Check if the current day has changed compared to the previously stored day
        if (currentDay !== parseInt(currentDateElement.textContent.split(' ')[1])) {
            updateDate(); // If a new day has started, update the date
        }
    }, 1000); // Check every second for date changes
}

// Event listener to start updating the date continuously
updateDateContinuously();

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('list-group-item');
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Done';
        completeBtn.classList.add('btn');
        completeBtn.addEventListener('click', function() {
            listItem.classList.toggle('complete');
        });
        listItem.appendChild(completeBtn);
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}

// Event listener to add a task
const addTaskBtn = document.getElementById('addTaskBtn');
addTaskBtn.addEventListener('click', addTask);

// Function to clear the task list
function clearList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
}

// Event listener to clear the task list
const clearListBtn = document.getElementById('clearListBtn');
clearListBtn.addEventListener('click', clearList);


//digital clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('clockDisplay').textContent = timeString;
}
 // Update the clock every second
 setInterval(updateClock, 1000);

 //pomodoro timer
// Initialize the timer as paused.
let isPaused = true;//timer starts in paused state

// Declare a variable to hold the timer interval ID.
let timer;//variable to hold timer interval

// Set the initial timer values to 25 minutes and 0 seconds.
let minutes = 25;
let seconds = 0;

// Get references to the HTML elements where the minutes and seconds will be displayed.
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Get references to the control buttons for the timer.
const startButton = document.getElementById('startTimerBtn');
const pomodoroButton = document.getElementById('pomodoro-session');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

// Function to update the timer display with the current minutes and seconds.
function updateDisplay() {
    // Pad the minutes and seconds with leading zeros if needed and update the text content of the respective elements.
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

// Function to handle the countdown logic for the timer.
function countdown() {
    // If the timer is paused, exit the function.
    if (isPaused) return;

    // If seconds are at 0, decrement minutes and reset seconds to 59.
    if (seconds === 0) {
        // If minutes are also at 0, clear the interval and alert the user that time's up.
        if (minutes === 0) {
            clearInterval(timer);
            alert("Time's up!");
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        // Otherwise, just decrement the seconds.
        seconds--;
    }

    // Update the display with the new time values.
    updateDisplay();
}

// Function to start the timer with a given duration in minutes.
function startTimer(duration) {
    // Clear any existing timer intervals to avoid multiple timers running concurrently.
    clearInterval(timer);

    // Set the timer as running (not paused).
    isPaused = true; //ensure timer is paused

    // Set the minutes to the given duration and reset seconds to 0.
    minutes = duration;
    seconds = 0;

    // Update the display with the new initial values.
    updateDisplay();

    startButton.textContent = 'start'; //ensures start button text is set to start 
}

// Event listener for the start/pause button.
startButton.addEventListener('click', () => {
    // Toggle the pause state.
    isPaused = !isPaused;

    // If the timer is now running (not paused), start the countdown.
    if (!isPaused) {
        timer = setInterval(countdown, 1000);
        startButton.textContent = 'Pause'; // Change button text to 'Pause'.
    } else {
        // If the timer is paused, clear the interval to stop the countdown.
        clearInterval(timer);
        startButton.textContent = 'Start'; // Change button text to 'Start'.
    }
});
// Event listeners for the mode buttons to set the timer duration without starting it
// Event listener for the Pomodoro session button.
pomodoroButton.addEventListener('click', () => {
    startTimer(25); // Start a 25-minute Pomodoro session.
    pomodoroButton.classList.add('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.remove('active');
});

// Event listener for the short break button.
shortBreakButton.addEventListener('click', () => {
    startTimer(5); // Start a 5-minute short break.
    pomodoroButton.classList.remove('active');
    shortBreakButton.classList.add('active');
    longBreakButton.classList.remove('active');

});

// Event listener for the long break button.
longBreakButton.addEventListener('click', () => {
    startTimer(15); // Start a 15-minute long break.
    pomodoroButton.classList.remove('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.add('active');
});
//Event listeners to close the modals when close buttons are clicked
closeButtons.forEach(button => {
    button.addEventListener('click', () =>{
        pomodoroModal.style.display = 'none';
        shortBreakModal.style.display = 'none';
        longBreakModal.style.display = 'none';
    });
});

// Initial call to update the display with the default timer values.
updateDisplay();

//alarms and reminders section




