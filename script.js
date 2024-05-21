// Current date section
function updateDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    const currentDateElement = document.getElementById('currentDate');
    currentDateElement.textContent = formattedDate;
}

function updateDateContinuously() {
    updateDate();
    setInterval(updateDate, 1000);
}

// To-do list section
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
        completeBtn.classList.add('btn', 'btn-sm', 'btn-success', 'ml-2');
        completeBtn.addEventListener('click', function() {
            listItem.classList.toggle('complete');
        });
        listItem.appendChild(completeBtn);
        taskList.appendChild(listItem);
        taskInput.value = '';
    }
}

const addTaskBtn = document.getElementById('addTaskBtn');
addTaskBtn.addEventListener('click', addTask);

function clearList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
}

const clearListBtn = document.getElementById('clearListBtn');
clearListBtn.addEventListener('click', clearList);

// Digital clock section
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('clockDisplay').textContent = timeString;
}

setInterval(updateClock, 1000);

// Pomodoro timer section
let isPaused = true;
let timer;
let minutes = 25;
let seconds = 0;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('startTimerBtn');
const pomodoroButton = document.getElementById('pomodoro-session');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

const pomodoroModal = document.getElementById('pomodoroOverModal');
const shortBreakModal = document.getElementById('shortBreakOverModal');
const longBreakModal = document.getElementById('longBreakOverModal');
const closeButtons = document.querySelectorAll('.close');
const alarmSound = document.getElementById("alarmSound");

function updateDisplay() {
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}

function countdown() {
    if (isPaused) return;

    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            alarmSound.play();
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

function setTimer(duration) {
    clearInterval(timer);
    isPaused = true;
    minutes = duration;
    seconds = 0;
    updateDisplay();
    startButton.textContent = 'Start';
}

startButton.addEventListener('click', () => {
    isPaused = !isPaused;
    if (!isPaused) {
        timer = setInterval(countdown, 1000);
        startButton.textContent = 'Pause';
    } else {
        clearInterval(timer);
        startButton.textContent = 'Start';
    }
});

pomodoroButton.addEventListener('click', () => {
    setTimer(25);
    pomodoroButton.classList.add('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.remove('active');
});

shortBreakButton.addEventListener('click', () => {
    setTimer(5);
    pomodoroButton.classList.remove('active');
    shortBreakButton.classList.add('active');
    longBreakButton.classList.remove('active');
});

longBreakButton.addEventListener('click', () => {
    setTimer(15);
    pomodoroButton.classList.remove('active');
    shortBreakButton.classList.remove('active');
    longBreakButton.classList.add('active');
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        pomodoroModal.style.display = 'none';
        shortBreakModal.style.display = 'none';
        longBreakModal.style.display = 'none';
    });
});

// Alarm/reminder section
const reminderTimeInput = document.getElementById('reminderTime');
const reminderMessageInput = document.getElementById('reminderMessage');
const setReminderBtn = document.getElementById('setReminderBtn');
const reminderList = document.getElementById('reminderList');
let reminders = [];

setReminderBtn.addEventListener('click', () => {
    const reminderTime = reminderTimeInput.value;
    const reminderMessage = reminderMessageInput.value;

    if (reminderTime && reminderMessage) {
        reminders.push({ time: reminderTime, message: reminderMessage });
        const li = document.createElement('li');
        li.textContent = `${reminderTime} - ${reminderMessage}`;
        reminderList.appendChild(li);
        reminderTimeInput.value = '';
        reminderMessageInput.value = '';
    }
});

function checkReminders() {
    const currentTime = new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5);
    reminders.forEach((reminder, index) => {
        if (reminder.time === currentTime) {
            alert(reminder.message);
            reminders.splice(index, 1);
            updateReminderList();
        }
    });
}

function updateReminderList() {
    reminderList.innerHTML = '';
    reminders.forEach(reminder => {
        const li = document.createElement('li');
        li.textContent = `${reminder.time} - ${reminder.message}`;
        reminderList.appendChild(li);
    });
}

setInterval(checkReminders, 1000); // Checks reminders every second

updateDateContinuously();
updateClock();
updateDisplay();
