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

//updating date and time automatically
//credit: code for display of date adapted from https://www.freecodecamp.org/news/javascript-date-format-how-to-format-a-date-in-js/
document.addEventListener('DOMContentLoaded', (event) => {
    // Function to update the current date
    function updateDate() {
        //get date element
        const dateElement = document.getElementById('currentDate');
        //get current date
        const currentDate = new Date();
        //format the date
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        //update date element folowing format above
        dateElement.textContent = currentDate.toLocaleDateString(undefined, options);
    }
    // initialize date
    updateDate();
    //update date continuously
    setInterval(updateDate, 60000); //update every minute

    // Function to update the clock display
    //credit: code for display of time adapted from https://www.freecodecamp.org/news/javascript-date-format-how-to-format-a-date-in-js/
    function updateClock() {
        //get clock element
        const clockElement = document.getElementById('clockDisplay');
        //get current time
        const currentTime = new Date();
        //format hours and mins
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        //update clock element folowing format above
        clockElement.textContent = `${hours}:${minutes}`;
    }

    // Initialize the clock
    updateClock();

    // Update the clock every second
    setInterval(updateClock, 1000);
});

// to-do list section
// Function to play a sound
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    try {
        sound.play().then(() => {
            // Playback succeeded
        }).catch(error => {
            console.error('Failed to play audio:', error);
        });
    } catch (error) {
        console.error('Failed to play audio:', error);
    }
}

// Function to add a task
// Credit: code for to do list adapted/inspired by learning from https://dev.to/karandeveloper/creating-todo-list-using-vanilla-javascript-2l7l
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    // Check the task text is not empty
    if (taskText !== '') {
        const listItem = document.createElement('li'); // Create a new list item element
        listItem.textContent = taskText; // Set the text content of the list item
        listItem.classList.add('list-group-item'); // Add class 'list-group-item' to list item
        // Task done/complete button
        // Credit: code for JavaScript button addition adapted/inspired by learning from https://www.altcademy.com/blog/how-to-create-a-button-in-javascript/
        const completeBtn = document.createElement('button'); // Create a button for completing a task
        completeBtn.textContent = 'Done'; // Set the button text to 'done'
        completeBtn.classList.add('btn', 'btn-sm'); // Add classes to button to target it
        // Add event listener to complete button
        completeBtn.addEventListener('click', function () {
            listItem.classList.toggle('complete');
            playSound('doneSound'); // Play done sound when complete button is clicked
        });
        // Credit: code for JavaScript adding list items from learning from https://www.altcademy.com/blog/how-to-create-a-button-in-javascript/
        // Add/append the complete button to the list item
        listItem.appendChild(completeBtn);
        // Add/append the list item to the task list container
        taskList.appendChild(listItem);
        // Clear the input field ready for a new reminder
        taskInput.value = '';
    }
}

// Button to add task
const addTaskBtn = document.getElementById('addTaskBtn');
// Add event listener to add task button to call function
addTaskBtn.addEventListener('click', () => {
    addTask();
    playSound('clickSound'); // Play click sound when add task button is clicked
});

// Function to clear the task list and congratulate the user
function clearList() {
    const taskList = document.getElementById('taskList'); // Get the task list container
    taskList.innerHTML = ''; // Clear the task list
    
    // Play congratulatory sound
    const congratsSound = document.getElementById('clearListSound');
    try {
        congratsSound.play().then(() => {
            // Playback succeeded
        }).catch(error => {
            console.error('Failed to play audio:', error);
        });
    } catch (error) {
        console.error('Failed to play audio:', error);
    }

    // Display congratulatory message
    const congratsMessage = document.createElement('div');
    congratsMessage.textContent = 'Congratulations on completing all your tasks!';
    congratsMessage.classList.add('congrats-message', 'alert');

    // Append the congratulatory message to the task list container
    taskList.appendChild(congratsMessage);

    // Optionally remove the congratulatory message after a few seconds
    setTimeout(() => {
        congratsMessage.remove();
    }, 5000); // Remove after 5 seconds
}

// Button to clear task list
const clearListBtn = document.getElementById('clearListBtn');
clearListBtn.addEventListener('click', clearList);


// Pomodoro timer section
//credit: code for pomodoro timer adapted/ inspired by learning from https://webdesign.tutsplus.com/create-a-pomodoro-timer-with-html-css-and-vanilla-javascript--cms-108069t

// Initialize variables
let isPaused = true;
let timer;
let minutes = 25;
let seconds = 0;

// DOM elements for timer display and control buttons
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('startTimerBtn');
const pomodoroButton = document.getElementById('pomodoro-session');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

// Modal elements for the display of timer notifications
const pomodoroModal = $('#pomodoroOverModal');
const shortBreakModal = $('#shortBreakOverModal');
const longBreakModal = $('#longBreakOverModal');

// Audio alarm element for when timer finishes
//const alarmSound = document.getElementById("alarmSound");
//const alarmSound = new Audio("assets/media/calm-alarm.wav");
const alarmSound = new Audio("assets/media/calm-alarm.wav");
alarmSound.preload = "auto"; // Preload the audio

// Function to update the timer display with the appropriate time
function updateDisplay() {
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

// Countdown function to decrement timer and update timer display
function countdown() {
    if (isPaused) return;

    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            //alarmSound.play();
            alarmSound.play().catch(function(error) {
                console.error('Failed to play audio:', error);
            });
            // Display modal based on whichever timer is 'active'
            if (pomodoroButton.classList.contains('active')) {
                pomodoroModal.modal('show');
            } else if (shortBreakButton.classList.contains('active')) {
                shortBreakModal.modal('show');
            } else if (longBreakButton.classList.contains('active')) {
                longBreakModal.modal('show');
            }
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }

    updateDisplay();
}

// Function to set the timer duration and update display
// Event listeners for timer control buttons
//credit: code for buttons and 'active' class adapted/ inspired by learning from https://www.youtube.com/watch?v=6zQPteD5Mvc
// Pomodoro button
pomodoroButton.addEventListener('click', () => {
    setTimer(25); // Set timer for pomodoro session (25 mins)
    pomodoroButton.classList.add('active'); // Mark pomodoro button as 'active'
    shortBreakButton.classList.remove('active'); // Remove active state from short break button
    longBreakButton.classList.remove('active'); // Remove active state from long break button
});

// Short break button
shortBreakButton.addEventListener('click', () => {
    setTimer(5); // Set timer for short break session (5 mins)
    pomodoroButton.classList.remove('active'); // Remove active state from pomodoro button
    shortBreakButton.classList.add('active'); // Mark short break button as 'active'
    longBreakButton.classList.remove('active'); // Remove active state from long break button
});

// Long break button
longBreakButton.addEventListener('click', () => {
    setTimer(15); // Set timer for long break session (15 mins)
    pomodoroButton.classList.remove('active'); // Remove active state from pomodoro button
    shortBreakButton.classList.remove('active'); // Remove active state from short break button
    longBreakButton.classList.add('active'); // Mark long break button as 'active'
});

function setTimer(duration) {
    clearInterval(timer); // Clear any existing timer
    isPaused = true; // Pause the timer
    minutes = duration; // Set minutes for the timer
    seconds = 0; // Reset seconds to 0
    updateDisplay(); // Update timer display
    startButton.textContent = 'Start'; // Reset start button text
}

// Start and pause button
//credit: code starting timer adapted/ inspired by learning from https://webdesign.tutsplus.com/create-a-pomodoro-timer-with-html-css-and-vanilla-javascript--cms-108069t
startButton.addEventListener('click', () => {
    isPaused = !isPaused; // Toggle timer pause state
    if (!isPaused) {
        timer = setInterval(countdown, 1000); // Start timer interval
        startButton.textContent = 'Pause'; // Change button text to pause
    } else {
        clearInterval(timer); // Pause timer interval
        startButton.textContent = 'Start'; // Change button text to 'start'
    }
});

// Event listeners for close buttons in modals
$('.modal .close').on('click', function () {
    $(this).closest('.modal').modal('hide');
});

// Alarm/reminder section
//credit: code for reminder app adapted/ inspired by tutorial from https://www.youtube.com/watch?v=3e7qkpByx84

// DOM elements
const reminderTimeInput = document.getElementById('reminderTime');
const reminderMessageInput = document.getElementById('reminderMessage');
const setReminderBtn = document.getElementById('setReminderBtn');
const reminderList = document.getElementById('reminderList');
const reminderModal = new bootstrap.Modal(document.getElementById('reminderModal'));
const reminderModalMessage = document.querySelector('#reminderModal .modal-body p');

// Audio element for the calm alarm sound
const calmAlarmSound = document.getElementById('calmAlarmSound');
const clickSound = document.getElementById('clickSound');
const doneSound = document.getElementById('doneSound');

// Array to store reminders
let reminders = [];

// Event listener for setting a reminder
setReminderBtn.addEventListener('click', () => {
    const reminderTime = reminderTimeInput.value; // Get the reminder time from the input
    const reminderMessage = reminderMessageInput.value; // Get the reminder message from the input

    // Check if both time and message are provided
    if (reminderTime && reminderMessage) {
        // Add reminder to array
        reminders.push({
            time: reminderTime,
            message: reminderMessage
        });

        // Play click sound
        clickSound.play();

        // Update reminder list display
        updateReminderList();

        // Clear the input fields
        reminderTimeInput.value = '';
        reminderMessageInput.value = '';
    }
});

// Function to check for reminders
function checkReminders() {
    // Get the current time
    const currentTime = new Date().toLocaleTimeString('en-GB', {
        hour12: false
    }).slice(0, 5);

    // Loop through the reminders array
    reminders.forEach((reminder, index) => {
        // Check if reminder time matches current time
        if (reminder.time === currentTime) {
            // Display reminder message in the modal
            reminderModalMessage.textContent = reminder.message;
            reminderModal.show();

            // Play calm alarm sound
            calmAlarmSound.play();

            // Remove reminder from array
            reminders.splice(index, 1);

            // Update reminder list display
            updateReminderList();
        }
    });
}

// Function to update the reminder list display
function updateReminderList() {
    // Clear current list items
    reminderList.innerHTML = '';

    // Repopulate list with remaining reminders
    reminders.forEach((reminder, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); // Add Bootstrap classes for styling

        // Create reminder text
        const reminderText = document.createElement('span');
        reminderText.textContent = `${reminder.time} - ${reminder.message}`;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        removeBtn.innerHTML = '&times;'; // X symbol
        removeBtn.addEventListener('click', () => {
             // Play done sound
             doneSound.play();
            // Remove reminder from array
            reminders.splice(index, 1);
            // Update reminder list display
            updateReminderList();
        });

        // Append text and button to list item
        li.appendChild(reminderText);
        li.appendChild(removeBtn);

        // Append list item to reminder list
        reminderList.appendChild(li);
    });
}

// Set interval to check reminders every second
setInterval(checkReminders, 1000);
