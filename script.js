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
 const focusTime = 25; //in mins
 const shortBreakTime = 5;
 const longBreakTime = 15;

 let currentTimer = focusTime * 60;
 let timerInterval = null;

 const timerDisplay = document.getElementById('timerDisplay');
 const startTimerBtn = document.getElementById('startTimerBtn');
 const stopTimerBtn = document.getElementById('stopTimerBtn');

 function updateTimerDisplay() {
    const minutes = Math.floor(currentTimer / 60);
    const seconds = currentTimer % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
 
  function startTimer() {
    timerInterval = setInterval(() => {
        currentTimer--;
        updateTimerDisplay();

        if (currentTimer <= 0) {
            clearInterval(timerInterval);
            //sound or modal?
        }
    }, 1000); // It's 1000 milliseconds for one second, not 100.
}

 //event listeners
 startTimerBtn.addEventListener('click', startTimer);
 stopTimerBtn.addEventListener('click', () => clearInterval(timerInterval)); // Stop the timer