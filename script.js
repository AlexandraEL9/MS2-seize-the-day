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

//todo list section

    // Function to add a new task
    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            listItem.classList.add('list-group-item');
            taskList.appendChild(listItem);
            taskInput.value = '';
        }
    }
 // Event listener to add a task
 const addTaskBtn = document.getElementById('addTaskBtn');
 addTaskBtn.addEventListener('click', addTask);

 //function to clear the task list
 function clearList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
 }
 // Event listener to clear the task list
 const clearListBtn = document.getElementById('clearListBtn');
 clearListBtn.addEventListener('click', clearList);
    