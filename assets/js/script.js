//sounds used throughout page
document.addEventListener('DOMContentLoaded', function () {
    const clickSound = new Audio("assets/media/click.wav");
    const clearListSound = new Audio("assets/media/clear-list.wav");
    const doneSound = new Audio("assets/media/done-cross-out.wav");
    const reminderSound = new Audio("assets/media/reminder.wav");
    reminderSound.preload = "auto";
    const alarmSound = new Audio("assets/media/calm-alarm.wav");
    alarmSound.preload = "auto";
  
    // Dark Mode / Light Mode Toggle
    const toggleDarkModeBtn = document.getElementById('toggleDarkModeBtn');
    const darkModeKey = 'darkMode';
    initDarkMode();
  
    toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
    //keep colour mode consisten across index.html and error.html page
    //credit: code for use of localStorage adapted from https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/
    function initDarkMode() {
      if (localStorage.getItem(darkModeKey) === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleDarkModeBtn.textContent = 'Light Mode';
      } else {
        toggleDarkModeBtn.textContent = 'Dark Mode';
      }
    }
    //change button display based on current mode
    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem(darkModeKey, 'enabled');
        toggleDarkModeBtn.textContent = 'Light Mode';
      } else {
        localStorage.setItem(darkModeKey, 'disabled');
        toggleDarkModeBtn.textContent = 'Dark Mode';
      }
    }
  
    //updating date and time automatically
    //credit: code for display of date adapted from https://www.freecodecamp.org/news/javascript-date-format-how-to-format-a-date-in-js/
    const dateElement = document.getElementById('currentDate');
    const clockElement = document.getElementById('clockDisplay');
    updateDate();
    updateClock();
    setInterval(updateDate, 60000); // Update every minute
    setInterval(updateClock, 1000); // Update every second
    //function to update current date
    function updateDate() {
      const currentDate = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      //update display of date based on format above
      dateElement.textContent = currentDate.toLocaleDateString(undefined, options);
    }
    //function to update time/clock display
    function updateClock() {
      const currentTime = new Date();
      const hours = String(currentTime.getHours()).padStart(2, '0');
      const minutes = String(currentTime.getMinutes()).padStart(2, '0');
      clockElement.textContent = `${hours}:${minutes}`;
    }
  
    // To-Do List Functionality
    // Credit: code for to do list adapted/inspired by learning from https://dev.to/karandeveloper/creating-todo-list-using-vanilla-javascript-2l7l
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearListBtn = document.getElementById('clearListBtn');
    addTaskBtn.addEventListener('click', () => {
      addTask();
      playSound(clickSound); //play sound file when button clicked
    });
    clearListBtn.addEventListener('click', clearList);
    //function- add task
    function addTask() {
      const taskInput = document.getElementById('taskInput');
      const taskList = document.getElementById('taskList');
      const taskText = taskInput.value.trim();
      //check task not empty
      if (taskText !== '') {
        const listItem = document.createElement('li'); //create new list item
        listItem.textContent = taskText; //set text of list item
        listItem.classList.add('list-group-item'); //add class for css
        // Task done/complete button
        // Credit: code for JavaScript button addition adapted/inspired by learning from https://www.altcademy.com/blog/how-to-create-a-button-in-javascript/
        const completeBtn = document.createElement('button'); //create button for completing task
        completeBtn.textContent = 'Done'; //set button text to done
        completeBtn.classList.add('btn', 'btn-sm'); //add class to target for styling
        //add event listener to button
        completeBtn.addEventListener('click', function () {
          listItem.classList.toggle('complete');
          playSound(doneSound); //play sound file when button clicked
        });
        // Credit: code for JavaScript adding list items from learning from https://www.altcademy.com/blog/how-to-create-a-button-in-javascript/
        // Add/append the complete button to the list item
        listItem.appendChild(completeBtn);
        taskList.appendChild(listItem);
        taskInput.value = '';
      }
    }
    //function to clear tasklist and congratulate the user
    function clearList() {
      const taskList = document.getElementById('taskList'); //get tasklist container
      taskList.innerHTML = ''; //clear task list
      playSound(clearListSound); //play sound file
      // Credit: code for adding html elements with javaScript from learning from https://www.youtube.com/watch?v=UA4cMMyqoaM
      const congratsMessage = document.createElement('div');
      congratsMessage.textContent = 'Congratulations on completing all your tasks!';
      congratsMessage.classList.add('congrats-message', 'alert');
      //append congrats message
      taskList.appendChild(congratsMessage);
      //remove congrats message automatically after 5sec
      setTimeout(() => congratsMessage.remove(), 5000);
    }
  
    // Pomodoro Timer Functionality
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
    //modal elements for display of timer notifications
    const pomodoroModal = $('#pomodoroOverModal');
    const shortBreakModal = $('#shortBreakOverModal');
    const longBreakModal = $('#longBreakOverModal');
    //set timer for different modes
    pomodoroButton.addEventListener('click', () => setTimer(25, 'pomodoro'));
    shortBreakButton.addEventListener('click', () => setTimer(5, 'short-break'));
    longBreakButton.addEventListener('click', () => setTimer(15, 'long-break'));
    startButton.addEventListener('click', toggleTimer);
  
    // Start and pause button
    //credit: code starting timer adapted/ inspired by learning from https://webdesign.tutsplus.com/create-a-pomodoro-timer-with-html-css-and-vanilla-javascript--cms-108069t
    function setTimer(duration, mode) {
      playSound(clickSound);
      clearInterval(timer);
      isPaused = true;
      minutes = duration;
      seconds = 0;
      updateTimerDisplay();
      startButton.textContent = 'Start';
      setActiveMode(mode);
    }
  
    function toggleTimer() {
      playSound(clickSound);
      isPaused = !isPaused;
      if (!isPaused) {
        timer = setInterval(countdown, 1000);
        startButton.textContent = 'Pause';
      } else {
        clearInterval(timer);
        startButton.textContent = 'Start';
      }
    }
  
    function countdown() {
      if (isPaused) return;
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          playSound(alarmSound);
          showCompletionModal();
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateTimerDisplay();
    }
  
    function updateTimerDisplay() {
      minutesElement.textContent = String(minutes).padStart(2, '0');
      secondsElement.textContent = String(seconds).padStart(2, '0');
    }
    //credit: code for buttons and 'active' class adapted/ inspired by learning from https://www.youtube.com/watch?v=6zQPteD5Mvc
    function setActiveMode(mode) {
      pomodoroButton.classList.toggle('active', mode === 'pomodoro');
      shortBreakButton.classList.toggle('active', mode === 'short-break');
      longBreakButton.classList.toggle('active', mode === 'long-break');
    }
    //display modal based on correct timer mode
    function showCompletionModal() {
      if (pomodoroButton.classList.contains('active')) {
        pomodoroModal.modal('show');
      } else if (shortBreakButton.classList.contains('active')) {
        shortBreakModal.modal('show');
      } else if (longBreakButton.classList.contains('active')) {
        longBreakModal.modal('show');
      }
    }
  
    // Reminder Functionality
    //credit: code for reminder app adapted/ inspired by tutorial from https://www.youtube.com/watch?v=3e7qkpByx84
    const reminderTimeInput = document.getElementById('reminderTime');
    const reminderMessageInput = document.getElementById('reminderMessage');
    const setReminderBtn = document.getElementById('setReminderBtn');
    const reminderList = document.getElementById('reminderList');
    const reminderModal = $('#reminderModal');
    const reminderModalMessage = document.getElementById('reminderMessageContent');
    //array to store reminder time and message
    let reminders = [];
  
    setReminderBtn.addEventListener('click', setReminder);
    setInterval(checkReminders, 1000);
  
    function setReminder() {
      const reminderTime = reminderTimeInput.value;
      const reminderMessage = reminderMessageInput.value;
      if (reminderTime && reminderMessage) {
        reminders.push({
          time: reminderTime,
          message: reminderMessage
        });
        playSound(clickSound);
        updateReminderList();
        reminderTimeInput.value = '';
        reminderMessageInput.value = '';
      }
    }
  
    function checkReminders() {
      const currentTime = new Date().toLocaleTimeString('en-GB', {
        hour12: false
      }).slice(0, 5);
      reminders.forEach((reminder, index) => {
        if (reminder.time === currentTime) {
          reminderModalMessage.textContent = reminder.message;
          reminderModal.modal('show');
          playSound(reminderSound);
          reminders.splice(index, 1);
          updateReminderList();
        }
      });
    }
  
    function updateReminderList() {
      reminderList.innerHTML = '';
      reminders.forEach((reminder, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex');
        const reminderText = document.createElement('span');
        reminderText.textContent = `${reminder.time} - ${reminder.message}`;
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-sm');
        removeBtn.innerHTML = '×';
        removeBtn.addEventListener('click', () => {
          playSound(doneSound);
          reminders.splice(index, 1);
          updateReminderList();
        });
        li.appendChild(reminderText);
        li.appendChild(removeBtn);
        reminderList.appendChild(li);
      });
    }
  
    // Helper Function to Play Sound
    function playSound(sound) {
      try {
        sound.play().then(() => {}).catch(error => {
          console.error('Failed to play audio:', error);
        });
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  });