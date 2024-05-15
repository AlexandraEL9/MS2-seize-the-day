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
//define timer variables
let pomodoro = document.getElementById("pomodoro-timer");
      let short = document.getElementById("short-timer");
      let long = document.getElementById("long-timer");
      let currentTimer = null;

      function showDefaultTimer() {
        pomodoro.style.display = "block";
        short.style.display = "none";
        long.style.display = "none";
      }

      showDefaultTimer();

      function hideAll() {
        let timers = document.querySelectorAll(".timer-display");
        timers.forEach((timer) => (timer.style.display = "none"));
      }

      document
        .getElementById("pomodoro-session")
        .addEventListener("click", function () {
          hideAll();

          pomodoro.style.display = "block";
          currentTimer = document.getElementById("pomodoro-timer");
          startTimer(currentTimer);
        });
      document
        .getElementById("short-break")
        .addEventListener("click", function () {
          hideAll();

          short.style.display = "block";
          currentTimer = document.getElementById("short-timer");
          startTimer(currentTimer);
        });
      document
        .getElementById("long-break")
        .addEventListener("click", function () {
          hideAll();

          long.style.display = "block";
          currentTimer = document.getElementById("long-timer");
          startTimer(currentTimer);
        });

      let myInterval = null;

      function startTimer(timerdisplay) {
        if (myInterval) {
          clearInterval(myInterval);
        }

        timerDuration = timerdisplay
          .getAttribute("data-duration")
          .split(":")[0];
        console.log(timerDuration);

        let durationinmiliseconds = timerDuration * 60 * 1000;
        let endTimestamp = Date.now() + durationinmiliseconds;

        myInterval = setInterval(function () {
          const timeRemaining = new Date(endTimestamp - Date.now());

          if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerdisplay.textContent = "00:00";
            const alarm = new Audio(
              "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
            );
            alarm.play();
          } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds
              .toString()
              .padStart(2, "0")}`;
            console.log(formattedTime);
            timerdisplay.textContent = formattedTime;
          }
        }, 1000);
      }

      document.getElementById("start").addEventListener("click", function () {
        if (currentTimer) {
            startTimer(currentTimer);
            document.getElementById("timer-message").style.display = "none"; 
        } else {
            document.getElementById("timer-message").style.display = "block";
        }
    });

      document.getElementById("stop").addEventListener("click", function () {
          clearInterval(myInterval);
          clearInterval(shortInterval);
          clearInterval(longInterval);
        }
      });