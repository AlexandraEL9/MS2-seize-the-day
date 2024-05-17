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
//define initial state of timer elements
//timer starts in paused state
let isPaused = true;

// Declare a variable to hold the timer interval ID.
let timer;

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

//function to update the timer display
function updateDisplay() {
  minutesElement.textContent = string(minutes).padStart(2, '0');
  secondsElement.textContent = string(seconds).padStart(2, '0');
}

//countdown logic
function countdown() {
  //timer on pause= exit function
  if (isPaused) return;

  //seconds at o- reset to 59
  if (seconde === 0) {
    //minutes also at 0- clear interval
    if (minutes === 0) {
      clearInterval(timer);
      //and alert that time is up
      alert("Time is up!");
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    //or decrement the seconds
    seconds--;
  }
  //show timer mins and seconds by updating display
  updateDisplay();
}

