let REAL_SECONDS_PER_GAME_MINUTE = 6;
const clock = document.getElementById('clock');
const timeMode = document.getElementById('time-mode');
const statusArea = document.getElementById('status-area');

timeMode.addEventListener('change', (e) => {
  REAL_SECONDS_PER_GAME_MINUTE = parseFloat(e.target.value);
});

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateStatus(h, m) {
  let statusMessages = [];

  if (h >= 7 && h < 21) {
    statusMessages.push("🏦 The bank is currently OPEN.");
  } else {
    statusMessages.push("🏦 The bank is currently CLOSED.");
  }

  if (h >= 7 && h < 22) {
    statusMessages.push("⛵ The boat to Guarma is AVAILABLE.");
  } else {
    statusMessages.push("⛵ The boat to Guarma is UNAVAILABLE.");
  }

  if (h >= 2 && h < 8) {
    statusMessages.push("🚂 The 2 AM Train News is currently broadcasting.");
  } else if (h >= 8 && h < 24) {
    statusMessages.push("🚂 The 8 AM Train News is currently broadcasting.");
  } else {
    statusMessages.push("🚂 Train News is off-air.");
  }

  statusArea.innerHTML = statusMessages.join("<br>");
}

function updateClock() {
  const now = new Date();
  const totalGameMinutes = (now.getTime() / 1000) / REAL_SECONDS_PER_GAME_MINUTE;
  const gameHours = Math.floor((totalGameMinutes / 60) % 24);
  const gameMinutes = Math.floor(totalGameMinutes % 60);

  const hh = pad(gameHours);
  const mm = pad(gameMinutes);

  clock.textContent = `${hh}:${mm}`;

  updateStatus(gameHours, gameMinutes);
  requestAnimationFrame(updateClock);
}

updateClock();
