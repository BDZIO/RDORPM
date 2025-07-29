
const REAL_SECONDS_PER_GAME_MINUTE_DEFAULT = 6;
let gameStart = new Date();
let startHour = 5;
let startMinute = 5;
let gameMinutesAtStart = startHour * 60 + startMinute;
let TIME_MULTIPLIER = 60 / REAL_SECONDS_PER_GAME_MINUTE_DEFAULT;
let note = document.getElementById("note");

function getGameTime() {
    let now = new Date();
    let realSecondsPassed = (now - gameStart) / 1000;
    let gameMinutesPassed = realSecondsPassed * TIME_MULTIPLIER;
    let totalMinutes = gameMinutesAtStart + gameMinutesPassed;

    // Reset to 6:00 every real 5AM and 5PM (+7 timezone)
    let bangkokTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
    let realHour = bangkokTime.getHours();
    let realMinute = bangkokTime.getMinutes();

    if ((realHour === 5 || realHour === 17) && realMinute === 0) {
        gameStart = new Date();
        gameMinutesAtStart = 6 * 60;
    }

    totalMinutes %= 1440;
    let hours = Math.floor(totalMinutes / 60) % 24;
    let minutes = Math.floor(totalMinutes % 60);
    return [hours, minutes];
}

function formatTime(unit) {
    return unit < 10 ? "0" + unit : unit;
}

function updateClock() {
    let [hours, minutes] = getGameTime();
    document.getElementById("clock").textContent = formatTime(hours) + ":" + formatTime(minutes);

    let messages = [];

    // Bank notification
    if (hours >= 7 && hours < 21) {
        messages.push("Bank is OPEN (7AM to 9PM)");
    } else {
        messages.push("Bank is CLOSED");
    }

    // Guarma Boat notification
    if (hours >= 7 && hours < 22) {
        messages.push("Boat to Guarma is AVAILABLE (7AM to 10PM)");
    } else {
        messages.push("Boat to Guarma is UNAVAILABLE");
    }

    // Train News Notification
    if ((hours >= 2 && hours < 8) || (hours >= 14 && hours < 24)) {
        messages.push("Train News is currently AVAILABLE");
    }

    note.textContent = messages.join(" | ");
}

setInterval(updateClock, 1000);
updateClock();
