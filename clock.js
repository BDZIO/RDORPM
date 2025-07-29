const REAL_SECONDS_PER_GAME_MINUTE = 6;
let gameMinutes = 5 * 60 + 5; // Start at 5:05

function updateClock() {
    gameMinutes += 1;
    if (gameMinutes >= 1440) gameMinutes = 0;

    const hours = Math.floor(gameMinutes / 60);
    const minutes = gameMinutes % 60;
    document.getElementById("clock").textContent =
        String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0');

    updateNotification(hours);
}

function updateNotification(hours) {
    const note = document.getElementById("notification");
    if (hours >= 7 && hours < 21) {
        note.textContent = "🏦 The Bank is OPEN (7AM to 9PM)";
    } else if (hours >= 21 || hours < 7) {
        note.textContent = "🏦 The Bank is CLOSED";
    }

    if (hours >= 7 && hours < 22) {
        note.textContent += "\n🛶 The boat to Guarma is AVAILABLE";
    } else {
        note.textContent += "\n🛶 The boat to Guarma is UNAVAILABLE";
    }

    if (hours >= 2 && hours < 24) {
        note.textContent += "\n🚂 " + hours + "AM Train News is currently available!";
    } else {
        note.textContent += "\n🚂 No Train News now.";
    }
}

function checkReset() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timezoneOffset = -now.getTimezoneOffset() / 60;
    if (timezoneOffset === 7 && minutes === 0 && (hours === 5 || hours === 17)) {
        gameMinutes = 6 * 60; // Reset to 6:00 AM
    }
}

setInterval(() => {
    updateClock();
    checkReset();
}, REAL_SECONDS_PER_GAME_MINUTE * 1000);

updateClock();