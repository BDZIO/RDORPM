
let REAL_SECONDS_PER_GAME_MINUTE_DEFAULT = 6;
let offsetMinutes = 0;

function updateClock() {
    const now = new Date();
    const gameMinutesTotal = Math.floor((now.getTime() / 1000 + offsetMinutes * 60) / REAL_SECONDS_PER_GAME_MINUTE_DEFAULT);
    const gameHours = Math.floor((gameMinutesTotal / 60) % 24);
    const gameMinutes = gameMinutesTotal % 60;

    const formattedTime = [
        gameHours.toString().padStart(2, '0'),
        gameMinutes.toString().padStart(2, '0')
    ].join(':');

    document.getElementById('clock').textContent = formattedTime;
}

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

setInterval(updateClock, 1000);
updateClock();
