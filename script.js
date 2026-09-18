let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = time % 1000;

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(3, "0")
    );
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", function () {

    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateDisplay, 10);
});

pauseBtn.addEventListener("click", function () {

    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

lapBtn.addEventListener("click", function () {

    if (elapsedTime === 0) {
        return;
    }

    const lapItem = document.createElement("li");

    lapItem.innerHTML = `
        <span>Lap ${laps.children.length + 1}</span>
        <span>${formatTime(elapsedTime)}</span>
    `;

    laps.appendChild(lapItem);
});

resetBtn.addEventListener("click", function () {

    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    startTime = 0;
    elapsedTime = 0;

    display.textContent = "00:00:00.000";

    laps.innerHTML = "";
});