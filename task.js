// Getting the required DOM elements
const task = document.getElementById('task')
const description = document.getElementById('description')
const timerControl = document.getElementById('timer-control')
const secondsElement = document.getElementById('seconds')
const minutesElement = document.getElementById('minutes')
const hourElement = document.getElementById('hour')
const entriesField = document.getElementById('entries')

/**
 * Declaring a global variable
 * This is to store the setInterval's Id, which we later use to clear that interval
 */
let timerIntervalID

// Adding event listener to the start/stop button
timerControl.addEventListener('click', function() {
    const currState = timerControl.textContent
    if(currState === 'Start') {
        // Changing text to stop
        timerControl.textContent = 'Stop'
        // color change - to red
        timerControl.style.setProperty('background-color', 'tomato')
        // running timer
        startTimer()
    } else {
        // Stopping timer
        clearInterval(timerIntervalID)
        // Adding a new entry
        addNewEntry()
        // Changing text to start
        timerControl.textContent = 'Start'
        // color change - to green
        timerControl.style.setProperty('background-color', 'rgb(101, 134, 101)')
        // resetting input fields
        task.value = ''
        description.value = ''
        // Reset timer values
        secondsElement.textContent = '00'
        minutesElement.textContent = '00'
        hourElement.textContent = '00'
    }
})

/**
 * Running the timer
 */
function startTimer() {
    let seconds = 0 //seconds
    let minutes = 0 //minutes
    let hours = 0 // hours

    // setInterval to to run the timer
    // Storing it in a variable we declared globally, so that we can be able to stop that when needed
    timerIntervalID = setInterval(function() {
        seconds++
        /**
         * Checking if seconds reaches 60
         * Then increasing the minutes by 1 and starting seconds from 0
         */
        if(seconds === 60) {
            seconds = 0
            minutes++
        }
        /**
         * Checking if minutes reaches 60
         * Then increasing the hour value by 1 and starting minutes from 0
         */
        if(minutes === 60) {
            minutes = 0
            hours++
        }
        // Changing the timer value
        secondsElement.textContent = seconds.toString().padStart(2, "0")
        minutesElement.textContent = minutes.toString().padStart(2, "0")
        hourElement.textContent = hours.toString().padStart(2, "0")
    }, 1000)
}

/**
 * Adding a new entry
 */
function addNewEntry() {
    entriesField.innerHTML += `
        <div class="entry">
            <div>${task.value}</div>
            <div>${description.value}</div>
            <div>${hourElement.textContent}:${minutesElement.textContent}:${secondsElement.textContent}</div>
        </div>
    `
}