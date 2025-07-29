let REAL_SECONDS_PER_GAME_MINUTE = 6;

function getGameTime() {
    const realNow = new Date();
    const realTimeInSeconds = realNow.getTime() / 1000;

    const gameMinutes = realTimeInSeconds / REAL_SECONDS_PER_GAME_MINUTE;
    const gameHours = Math.floor((gameMinutes / 60) % 24);
    const gameMins = Math.floor(gameMinutes % 60);

    return {
        hours: gameHours.toString().padStart(2, '0'),
        minutes: gameMins.toString().padStart(2, '0')
    };
}

function updateClock() {
    const time = getGameTime();
    document.getElementById('clock').textContent = `${time.hours}:${time.minutes}`;
}

// Update every real second
setInterval(updateClock, 1000);
updateClock();
