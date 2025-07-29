
let REAL_SECONDS_PER_GAME_MINUTE = 6;

function updateClock() {
  const now = new Date();
  const gameMinutes = Math.floor((now.getTime() / 1000 / REAL_SECONDS_PER_GAME_MINUTE) % 60);
  const gameHours = Math.floor((now.getTime() / 1000 / REAL_SECONDS_PER_GAME_MINUTE / 60) % 24);

  const hh = gameHours.toString().padStart(2, '0');
  const mm = gameMinutes.toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hh}:${mm}`;

  const status = document.getElementById('status');
  let messages = [];

  if (gameHours >= 7 && gameHours < 21) {
    messages.push("🏦 The bank is OPEN");
  } else {
    messages.push("🏦 The bank is CLOSED");
  }

  if (gameHours >= 7 && gameHours < 22) {
    messages.push("🛳️ The boat to Guarma is AVAILABLE");
  } else {
    messages.push("🛳️ The boat to Guarma is UNAVAILABLE");
  }

  if (gameHours >= 2 && gameHours < 8) {
    messages.push("🗞️ 2AM Train News is currently AVAILABLE");
  } else if (gameHours >= 8 && gameHours < 24) {
    messages.push("🗞️ 8AM Train News is currently AVAILABLE");
  }

  status.innerHTML = messages.join("<br>");
}

setInterval(updateClock, 1000);
updateClock();
