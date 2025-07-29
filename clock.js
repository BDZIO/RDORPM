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
let offsetMinutes = 0;

function getGameTime() {
    const realNow = new Date();
    const realTimeInSeconds = realNow.getTime() / 1000;
    const gameMinutes = realTimeInSeconds / REAL_SECONDS_PER_GAME_MINUTE_DEFAULT;
    const adjustedMinutes = gameMinutes + offsetMinutes;

    const hours = Math.floor((adjustedMinutes / 60) % 24);
    const minutes = Math.floor(adjustedMinutes % 60);

    return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0')
    };
}

function updateClock() {
    const time = getGameTime();
    document.getElementById('clock').textContent = `${time.hours}:${time.minutes}`;
}

// Add offset controls temporarily
function addTimeButtons() {
    const container = document.createElement('div');
    container.id = 'time-buttons';
    container.style.marginTop = '10px';

    container.innerHTML = `
        <button onclick="offsetMinutes += 60">+1 Hour</button>
        <button onclick="offsetMinutes += 30">+30 Minutes</button>
        <button onclick="removeTimeButtons()">Finish</button>
    `;

    document.body.appendChild(container);
}

// Remove the buttons
function removeTimeButtons() {
    const btns = document.getElementById('time-buttons');
    if (btns) btns.remove();
function addTimeButtons() {
    document.getElementById('adjustBtn').style.display = 'none';

    const container = document.createElement('div');
    container.id = 'time-buttons';
    container.style.marginTop = '10px';

    container.innerHTML = `
        <button onclick="offsetMinutes += 60; updateClock()">+1 Hour</button>
        <button onclick="offsetMinutes += 30; updateClock()">+30 Minutes</button>
        <button onclick="removeTimeButtons()">Finish</button>
    `;

    document.body.appendChild(container);
}

function removeTimeButtons() {
    const btns = document.getElementById('time-buttons');
    if (btns) btns.remove();
    document.getElementById('adjustBtn').style.display = 'inline';
}
