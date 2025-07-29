const REAL_SECONDS_PER_GAME_MINUTE = 6;
let gameStartTime = new Date();
gameStartTime.setHours(5);
gameStartTime.setMinutes(5);
gameStartTime.setSeconds(0);

function updateClock() {
    const now = new Date();
    const elapsedSeconds = Math.floor((now - gameStartTime) / 1000);
    const gameMinutesPassed = Math.floor(elapsedSeconds / REAL_SECONDS_PER_GAME_MINUTE);
    
    let gameDate = new Date();
    gameDate.setHours(5);
    gameDate.setMinutes(5);
    gameDate.setSeconds(0);
    gameDate.setMinutes(gameDate.getMinutes() + gameMinutesPassed);

    let hours = gameDate.getHours().toString().padStart(2, '0');
    let minutes = gameDate.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
    
    // Status Notifications
    const statusEl = document.getElementById('status');
    const h = gameDate.getHours();
    const m = gameDate.getMinutes();
    const total = h * 60 + m;
    let messages = [];

    if (total >= 420 && total < 1260) messages.push("Bank is OPEN");
    else messages.push("Bank is CLOSED");

    if (total >= 420 && total < 1320) messages.push("Boat to Guarma is AVAILABLE");
    else messages.push("Boat to Guarma is UNAVAILABLE");

    if (total >= 120 && total < 1440) {
        if (h === 2 || h === 8) messages.push(`${h}:00 Train News is currently AVAILABLE`);
    }

    statusEl.textContent = messages.join(" • ");
}

setInterval(updateClock, 1000);
updateClock();