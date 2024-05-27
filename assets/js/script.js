/* global bootstrap, $ */

// Dark mode / Light mode toggle

//add event listener to button
document.getElementById('toggleDarkModeBtn').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Update button text based on current mode
    if (document.body.classList.contains('dark-mode')) {
        this.textContent = 'Light Mode';
    } else {
        this.textContent = 'Dark Mode';
    }
});

//updating date and time automatically
document.addEventListener('DOMContentLoaded', (event) => {
    // Function to update the current date
    function updateDate() {
        //get date element
        const dateElement = document.getElementById('currentDate');
        //get current date
        const currentDate = new Date();
        //format the date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //update date element folowing format above
        dateElement.textContent = currentDate.toLocaleDateString(undefined, options);
    }
    // initialize date
    updateDate();
    //update date continuously
    setInterval(updateDate, 60000); //update every minute

    // Function to update the clock display
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

//function to add a task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    //check the task text is not empty
    if (taskText !== '') {
        const listItem = document.createElement('li'); //create a new list item element
        listItem.textContent = taskText; //set the text content of the list item
        listItem.classList.add('list-group-item');//add class 'list-group-item' to list item

        const completeBtn = document.createElement('button'); //create a button for completing a task
        completeBtn.textContent = 'Done'; //set the button text to 'done'
        completeBtn.classList.add('btn', 'btn-sm'); //add classes to button to target it
        //add event listener to complete button
        completeBtn.addEventListener('click', function() {
            listItem.classList.toggle('complete');
        });
        //add/ append the complete button to the list item
        listItem.appendChild(completeBtn);
        //add/ append the list item to the task list container
        taskList.appendChild(listItem);
        //clear the input field ready for a new reminder
        taskInput.value = '';
    }
}

//button to add task
const addTaskBtn = document.getElementById('addTaskBtn');
//add event listener to add task button to call function
addTaskBtn.addEventListener('click', addTask);

//function to clear the task list
function clearList() {
    const taskList = document.getElementById('taskList');//get the tasklist container
    taskList.innerHTML = '';//clear the tasklist
}
//button to clear task
const clearListBtn = document.getElementById('clearListBtn');
clearListBtn.addEventListener('click', clearList);

// Pomodoro timer section

//initialize variables
let isPaused = true;
let timer;
let minutes = 25;
let seconds = 0;

//dom elements for timer display and control buttons
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('startTimerBtn');
const pomodoroButton = document.getElementById('pomodoro-session');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

//modal elements for the display of timer notifications
const pomodoroModal = document.getElementById('pomodoroOverModal');
const shortBreakModal = document.getElementById('shortBreakOverModal');
const longBreakModal = document.getElementById('longBreakOverModal');
//close button to dismiss modals
const closeButtons = document.querySelectorAll('.close');
//audio alarm element for when timer finishes
const alarmSound = document.getElementById("alarmSound");

//function to update the timer display with the appropriate time
function updateDisplay() {
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

//countdoum function to decrement timer and update timer display
function countdown() {
    if (isPaused) return;

    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            alarmSound.play();
            //display modal based on whichever timer is 'active'
            if (pomodoroButton.classList.contains('active')) {
                pomodoroModal.style.display = 'block';
            } else if (shortBreakButton.classList.contains('active')) {
                shortBreakModal.style.display = 'block';
            } else if (longBreakButton.classList.contains('active')) {
                longBreakModal.style.display = 'block';
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
function setTimer(duration) {
    clearInterval(timer); //clear any existing timer
    isPaused = true; //pause the timer
    minutes = duration; //set minutes for the timer
    seconds = 0; //reset seconds to 0
    updateDisplay(); //update timer display
    startButton.textContent = 'Start'; //reset start button text
}

//event listeners for timer control buttons

//start and pause button
startButton.addEventListener('click', () => {
    isPaused = !isPaused; //toggle timer pause state
    if (!isPaused) {
        timer = setInterval(countdown, 1000); //start timer interval
        startButton.textContent = 'Pause'; //change button text to pause
    } else {
        clearInterval(timer); //pause timer interval
        startButton.textContent = 'Start'; //change button text to 'start'
    }
});

//pomodoro button
pomodoroButton.addEventListener('click', () => {
    setTimer(25); //set timer for pomodoro session (25mins)
    pomodoroButton.classList.add('active'); //mark pomodoro button as 'active'
    shortBreakButton.classList.remove('active'); // remove active state from short break button
    longBreakButton.classList.remove('active'); // remove active state from long break button
});

shortBreakButton.addEventListener('click', () => {
    setTimer(5); //set timer for short break session (5mins)
    pomodoroButton.classList.remove('active'); // remove active state from pomodoro button
    shortBreakButton.classList.add('active'); //mark short break button as 'active'
    longBreakButton.classList.remove('active'); // remove active state from long break button
});

longBreakButton.addEventListener('click', () => {
    setTimer(15); //set timer for long break session (15mins)
    pomodoroButton.classList.remove('active'); // remove active state from pomodoro button
    shortBreakButton.classList.remove('active'); // remove active state from short break button
    longBreakButton.classList.add('active'); //mark long break button as 'active'
});

//evemt listeners for close buttons in modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        //hide all modals when close button is clicked
        pomodoroModal.style.display = 'none';
        shortBreakModal.style.display = 'none';
        longBreakModal.style.display = 'none';
    });
});

// Alarm/reminder section

// DOM elements
const reminderTimeInput = document.getElementById('reminderTime');
const reminderMessageInput = document.getElementById('reminderMessage');
const setReminderBtn = document.getElementById('setReminderBtn');
const reminderList = document.getElementById('reminderList');
const reminderModal = new bootstrap.Modal(document.getElementById('reminderModal'));
const reminderModalMessage = document.querySelector('#reminderModal .modal-body p');

// Array to store reminders
let reminders = [];

// Event listener for setting a reminder
setReminderBtn.addEventListener('click', () => {
  const reminderTime = reminderTimeInput.value; // Get the reminder time from the input
  const reminderMessage = reminderMessageInput.value; // Get the reminder message from the input

  // Check if both time and message are provided
  if (reminderTime && reminderMessage) {
    // Add reminder to array
    reminders.push({ time: reminderTime, message: reminderMessage });

    // Create the list item to display the reminder
    const li = document.createElement('li');
    li.classList.add('list-group-item'); // Add Bootstrap class for styling
    li.textContent = `${reminderTime} - ${reminderMessage}`;
    reminderList.appendChild(li);

    // Clear the input fields
    reminderTimeInput.value = '';
    reminderMessageInput.value = '';
  }
});

// Function to check for reminders
function checkReminders() {
  // Get the current time
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);

  // Loop through the reminders array
  reminders.forEach((reminder, index) => {
    // Check if reminder time matches current time
    if (reminder.time === currentTime) {
      // Display reminder message in the modal
      reminderModalMessage.textContent = reminder.message;
      reminderModal.show();

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
  reminders.forEach(reminder => {
    const li = document.createElement('li');
    li.classList.add('list-group-item'); // Add Bootstrap class for styling
    li.textContent = `${reminder.time} - ${reminder.message}`;
    reminderList.appendChild(li);
  });
}

// Set interval to check reminders every second
setInterval(checkReminders, 1000);

// JavaScript to trigger subscription modal
document.getElementById('joinUsBtn').addEventListener('click', function() {
  // Show the subscription modal
  $('#subscriptionModal').modal('show');
});
