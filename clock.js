
const REAL_SECONDS_PER_GAME_MINUTE = 6;
const TIME_MULTIPLIER = 60 / REAL_SECONDS_PER_GAME_MINUTE;

function getAdjustedGameMinutes() {
    const now = new Date();
    const bangkokNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
    const bangkokHour = bangkokNow.getHours();
    const bangkokMinute = bangkokNow.getMinutes();
    const bangkokSeconds = bangkokNow.getSeconds();

    const realMillis = bangkokNow.getTime();

    // Calculate time since the last reset (5:00 AM or 5:00 PM UTC+7)
    const currentResetHour = bangkokHour >= 5 && bangkokHour < 17 ? 5 : 17;
    const resetTime = new Date(bangkokNow);
    resetTime.setHours(currentResetHour, 0, 0, 0);

    const millisSinceReset = realMillis - resetTime.getTime();
    const gameMinutesPassed = Math.floor(millisSinceReset / 1000 / REAL_SECONDS_PER_GAME_MINUTE);

    // Start at 6:00 AM = 360 minutes
    const totalGameMinutes = (360 + gameMinutesPassed) % 1440;
    return totalGameMinutes;
}

function formatTime(unit) {
    return unit < 10 ? "0" + unit : unit;
}

function updateClock() {
    const totalGameMinutes = getAdjustedGameMinutes();
    const hours = Math.floor(totalGameMinutes / 60) % 24;
    const minutes = Math.floor(totalGameMinutes % 60);

    document.getElementById("clock").textContent = formatTime(hours) + ":" + formatTime(minutes);

    const messages = [];

    // Bank
    if (hours >= 7 && hours < 21) {
        messages.push("Bank is OPEN (7AM–9PM)");
    } else {
        messages.push("Bank is CLOSED");
    }

    // Guarma Boat
    if (hours >= 7 && hours < 22) {
        messages.push("Boat to Guarma is AVAILABLE (7AM–10PM)");
    } else {
        messages.push("Boat to Guarma is UNAVAILABLE");
    }

    // Train News
    if ((hours >= 2 && hours < 8) || (hours >= 14 && hours < 24)) {
        messages.push("Train News is currently AVAILABLE");
    }

    document.getElementById("note").textContent = messages.join(" | ");
}

setInterval(updateClock, 1000);
updateClock();
