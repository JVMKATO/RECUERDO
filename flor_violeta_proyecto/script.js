const intro = document.getElementById('intro');
const startButton = document.getElementById('startButton');
const universe = document.getElementById('universe');
const flowerLayer = document.getElementById('flowerLayer');
const replayButton = document.getElementById('replayButton');

let flowerTimer = null;
const flowers = ['✿','❀','✾','✽','✿','❁','✧'];

function makeFlower(initial = false) {
  const flower = document.createElement('span');
  flower.className = 'floating-flower';
  flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
  const size = 18 + Math.random() * 38;
  const duration = 9 + Math.random() * 10;
  flower.style.left = `${Math.random() * 100}%`;
  flower.style.fontSize = `${size}px`;
  flower.style.setProperty('--duration', `${duration}s`);
  flower.style.setProperty('--drift', `${Math.round(Math.random() * 180 - 90)}px`);
  flower.style.setProperty('--opacity', `${0.28 + Math.random() * 0.48}`);
  if (initial) flower.style.animationDelay = `${Math.random() * 4}s`;
  flowerLayer.appendChild(flower);
  window.setTimeout(() => flower.remove(), (duration + 5) * 1000);
}

function startFlowers() {
  flowerLayer.innerHTML = '';
  for (let i = 0; i < 34; i++) makeFlower(true);
  if (flowerTimer) clearInterval(flowerTimer);
  flowerTimer = setInterval(() => makeFlower(), 520);
}

function revealSurprise() {
  intro.classList.add('hide');
  universe.classList.add('show');
  universe.setAttribute('aria-hidden', 'false');
  startFlowers();
}

startButton.addEventListener('click', revealSurprise);
replayButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  universe.classList.remove('show');
  universe.setAttribute('aria-hidden', 'true');
  intro.classList.remove('hide');
  flowerLayer.innerHTML = '';
  if (flowerTimer) clearInterval(flowerTimer);
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && flowerTimer) clearInterval(flowerTimer);
  else if (!document.hidden && universe.classList.contains('show')) {
    flowerTimer = setInterval(() => makeFlower(), 520);
  }
});
