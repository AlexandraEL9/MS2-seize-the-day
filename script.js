//function to update current date and time
function updateDateTime() {
    //get current date and time
    const currentDate = new Date();//creates object for date info
    //say how date to be formatted
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    //format date
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);
    //get current hrs and mins
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    //format time as HH:MM
    const formattedTime = `${hours}:${minutes}`;
    //get element where date and time will be displayed
    const currentDateTimeElement = document.getElementById('currentDateTime');
    //set text content of the element
    currentDateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
}

// Function to update the date and time every minute
function updateTimeContinuously() {
    updateDateTime();
    setInterval(updateDateTime, 60000);//update every minute
}

// Event listeners
updateTimeContinuously();