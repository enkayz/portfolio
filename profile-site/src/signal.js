import { createCanvasRenderer, createGpuRenderer } from "./signal-renderer.js";

const field = document.querySelector(".field");
const ship = document.querySelector(".ship");
const startButton = document.querySelector("[data-start]");
const resetButton = document.querySelector("[data-reset]");
const soundButton = document.querySelector("[data-sound]");
const status = document.querySelector("[data-status]");
const count = document.querySelector("[data-count]");
const clock = document.querySelector("[data-clock]");
const discovery = document.querySelector("[data-discovery]");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const projects = [...document.querySelectorAll("[data-project]")];
const relays = [...field.querySelectorAll("[data-node]")].map((button) => ({
  button,
  name: button.dataset.name,
  x: Number(button.dataset.x),
  y: Number(button.dataset.y),
  locked: false,
  lockedAt: 0,
  age: 1,
}));
const vector = {
  arrowleft: [-1, 0], a: [-1, 0],
  arrowright: [1, 0], d: [1, 0],
  arrowup: [0, -1], w: [0, -1],
  arrowdown: [0, 1], s: [0, 1],
};
const initial = { x: .185, y: .738, heading: -.62 };
const pressed = new Set();
const wake = [];
let canvas = field.querySelector("canvas");
let renderer = createCanvasRenderer(canvas);
let phase = "ready";
let launchAt = 0;
let finishedAt = 0;
let lastFrame = 0;
let frameHandle = 0;
let nextWake = 0;
let target = null;
let x = initial.x;
let y = initial.y;
let heading = initial.heading;
let visible = true;
let width = field.clientWidth;
let height = field.clientHeight;
let audio = null;
let master = null;
let audioOn = false;

function schedule() {
  if (!frameHandle && visible && !document.hidden) frameHandle = requestAnimationFrame(tick);
}

function activateRenderer(next, nextCanvas) {
  if (canvas !== nextCanvas) canvas.replaceWith(nextCanvas);
  canvas = nextCanvas;
  renderer = next;
  field.dataset.renderer = renderer?.type ?? "static";
  schedule();
}

function fallBack() {
  const replacement = canvas.cloneNode(false);
  activateRenderer(createCanvasRenderer(replacement), replacement);
}

function updateControls() {
  const complete = phase === "complete";
  startButton.firstChild.textContent = complete ? "Play again " : phase === "flying" ? "Focus flight field " : "Start the run ";
  resetButton.disabled = phase === "ready";
  status.parentElement.toggleAttribute("data-complete", complete);
}

function offerLink(label, href) {
  discovery.firstChild.textContent = label + " ";
  discovery.href = href;
  discovery.hidden = false;
  status.parentElement.setAttribute("data-has-link", "");
}

function placeShip() {
  ship.style.setProperty("--x", x * 100 + "%");
  ship.style.setProperty("--y", y * 100 + "%");
  ship.style.setProperty("--heading", heading + "rad");
}

function clearTarget() {
  target?.button?.removeAttribute("data-target");
  target = null;
}

function launch() {
  if (phase !== "ready") return;
  phase = "flying";
  launchAt = performance.now();
  status.textContent = "Flight started. Choose a relay.";
  updateControls();
  schedule();
}

function reset() {
  phase = "ready";
  launchAt = 0;
  finishedAt = 0;
  x = initial.x;
  y = initial.y;
  heading = initial.heading;
  pressed.clear();
  wake.length = 0;
  clearTarget();
  for (const relay of relays) {
    relay.locked = false;
    relay.lockedAt = 0;
    relay.age = 1;
    relay.button.setAttribute("aria-pressed", "false");
  }
  placeShip();
  count.textContent = "0 / 3";
  clock.textContent = "00:00.0";
  status.textContent = "Ready for launch";
  discovery.hidden = true;
  status.parentElement.removeAttribute("data-has-link");
  updateControls();
  schedule();
}

function playSignal(index, complete) {
  if (!audioOn || audio?.state !== "running") return;
  const time = audio.currentTime;
  const notes = [392, 523.25, 659.25];
  const chord = complete ? notes : [notes[index]];
  chord.forEach((note, offset) => {
    const start = time + offset * .065;
    const tone = audio.createOscillator();
    const envelope = audio.createGain();
    tone.type = "sine";
    tone.frequency.value = note;
    envelope.gain.setValueAtTime(.001, start);
    envelope.gain.exponentialRampToValueAtTime(.36, start + .024);
    envelope.gain.exponentialRampToValueAtTime(.001, start + .37);
    tone.connect(envelope).connect(master);
    tone.start(start);
    tone.stop(start + .4);
    tone.addEventListener("ended", () => { tone.disconnect(); envelope.disconnect(); }, { once: true });
  });
}

async function toggleSound() {
  const Audio = window.AudioContext || window.webkitAudioContext;
  try {
    if (!audio) {
      audio = new Audio();
      master = audio.createGain();
      master.gain.value = 0;
      master.connect(audio.destination);
    }
    if (!audioOn) {
      await audio.resume();
      audioOn = audio.state === "running";
    } else {
      audioOn = false;
    }
    master.gain.setTargetAtTime(audioOn ? .12 : 0, audio.currentTime, .04);
    soundButton.textContent = audioOn ? "Sound on" : "Sound off";
    soundButton.setAttribute("aria-pressed", String(audioOn));
  } catch {
    soundButton.textContent = "Sound unavailable";
    soundButton.disabled = true;
  }
}

function collect(now) {
  for (const [index, relay] of relays.entries()) {
    if (relay.locked || Math.hypot(x - relay.x, y - relay.y) > .046) continue;
    relay.locked = true;
    relay.lockedAt = now;
    relay.button.setAttribute("aria-pressed", "true");
    const total = relays.filter((entry) => entry.locked).length;
    count.textContent = total + " / " + relays.length;
    const complete = total === relays.length;
    playSignal(index, complete);
    if (complete) {
      phase = "complete";
      finishedAt = now;
      pressed.clear();
      clearTarget();
      status.textContent = "All three relays connected.";
      offerLink("Open the project directory", "/sites/");
      updateControls();
      break;
    }
    status.textContent = relay.name + " connected. " + total + " of " + relays.length + " relays.";
    offerLink("Open " + projects[index].textContent.trim(), projects[index].href);
  }
}

function travel(destination) {
  if (phase === "complete") return;
  launch();
  clearTarget();
  target = destination;
  if (target.button && !target.locked) {
    target.button.setAttribute("data-target", "");
    status.textContent = "Flying to " + target.name + ".";
  }
  if (motion.matches) {
    heading = Math.atan2((target.y - y) * height, (target.x - x) * width);
    x = target.x;
    y = target.y;
    placeShip();
    clearTarget();
    collect(performance.now());
  }
  schedule();
}

function step(now, dt) {
  if (phase !== "flying") return;
  let dx = 0;
  let dy = 0;
  for (const key of pressed) {
    dx += vector[key][0];
    dy += vector[key][1];
  }
  const manual = dx !== 0 || dy !== 0;
  if (manual) {
    if (target?.button) status.textContent = "Manual flight.";
    clearTarget();
  } else if (target) {
    dx = target.x - x;
    dy = target.y - y;
  }
  const distance = Math.hypot(dx, dy);
  if (distance) {
    const distanceThisFrame = dt * (manual ? .58 : .92);
    if (!motion.matches && now >= nextWake) {
      wake.unshift({ x, y, at: now, strength: 1 });
      if (wake.length > 8) wake.pop();
      nextWake = now + 24;
    }
    heading = Math.atan2(dy * height, dx * width);
    const scale = manual ? distanceThisFrame / distance : Math.min(1, distanceThisFrame / distance);
    x = Math.max(.045, Math.min(.955, x + dx * scale));
    y = Math.max(.055, Math.min(.945, y + dy * scale));
    placeShip();
    if (target && scale === 1) clearTarget();
  } else if (target) {
    clearTarget();
  }
  collect(now);
}

function draw(now) {
  if (!renderer || !width || !height) return;
  const ratio = Math.min(devicePixelRatio || 1, width < 470 ? 1.35 : 1.65);
  const time = motion.matches ? 0 : now / 1000;
  relays.forEach((relay) => {
    relay.age = motion.matches || !relay.locked ? 1 : Math.min(1, (now - relay.lockedAt) / 650);
  });
  renderer.draw({
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
    time, x, y, target, relays, wake,
  });
}

function showElapsed(now) {
  if (phase === "ready") return;
  const tenths = Math.max(0, Math.floor(((finishedAt || now) - launchAt) / 100));
  const minutes = String(Math.floor(tenths / 600)).padStart(2, "0");
  const seconds = String(Math.floor(tenths / 10) % 60).padStart(2, "0");
  const label = minutes + ":" + seconds + "." + (tenths % 10);
  if (clock.textContent !== label) clock.textContent = label;
}

function tick(now) {
  frameHandle = 0;
  const dt = lastFrame ? Math.min(.045, (now - lastFrame) / 1000) : 1 / 60;
  lastFrame = now;
  step(now, dt);
  showElapsed(now);
  wake.forEach((point) => { point.strength = Math.max(0, 1 - (now - point.at) / 380); });
  while (wake.length && !wake.at(-1).strength) wake.pop();
  try {
    draw(now);
  } catch (error) {
    if (renderer?.type !== "webgpu") throw error;
    fallBack();
  }
  if (phase === "flying" || (!motion.matches && (renderer?.type === "webgpu" || wake.length || relays.some((relay) => relay.age < 1)))) {
    schedule();
  } else {
    lastFrame = 0;
  }
}

for (const relay of relays) {
  relay.button.style.setProperty("--x", relay.x * 100 + "%");
  relay.button.style.setProperty("--y", relay.y * 100 + "%");
  relay.button.hidden = false;
  relay.button.addEventListener("click", () => travel(relay));
}
startButton.hidden = false;
resetButton.hidden = false;
soundButton.hidden = !(window.AudioContext || window.webkitAudioContext);
ship.hidden = false;
placeShip();
updateControls();
activateRenderer(renderer, canvas);

startButton.addEventListener("click", () => {
  if (phase === "complete") reset();
  if (phase === "ready") travel(relays[0]);
  field.focus({ preventScroll: true });
  field.scrollIntoView({ block: "nearest", behavior: motion.matches ? "auto" : "smooth" });
});
resetButton.addEventListener("click", () => {
  reset();
  field.focus({ preventScroll: true });
});
soundButton.addEventListener("click", toggleSound);
field.addEventListener("click", (event) => {
  if (event.target.closest("button") || event.detail === 0) return;
  const rect = field.getBoundingClientRect();
  travel({
    x: Math.max(.045, Math.min(.955, (event.clientX - rect.left) / rect.width)),
    y: Math.max(.055, Math.min(.945, (event.clientY - rect.top) / rect.height)),
  });
});
field.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || phase === "complete") return;
  const key = event.key.toLowerCase();
  if (/^[123]$/.test(key)) {
    event.preventDefault();
    if (!event.repeat) travel(relays[Number(key) - 1]);
  } else if (Object.hasOwn(vector, key)) {
    event.preventDefault();
    launch();
    pressed.add(key);
    schedule();
  }
});
window.addEventListener("keyup", (event) => pressed.delete(event.key.toLowerCase()));
window.addEventListener("blur", () => pressed.clear());
field.addEventListener("focusout", (event) => {
  if (!field.contains(event.relatedTarget)) pressed.clear();
});
document.addEventListener("visibilitychange", () => {
  lastFrame = 0;
  if (document.hidden) pressed.clear();
  else schedule();
});
motion.addEventListener("change", () => {
  if (motion.matches) wake.length = 0;
  schedule();
});
new ResizeObserver(() => {
  width = field.clientWidth;
  height = field.clientHeight;
  schedule();
}).observe(field);
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  if (visible) schedule();
  else lastFrame = 0;
}).observe(field);

if (navigator.gpu) {
  const replacement = canvas.cloneNode(false);
  createGpuRenderer(replacement, () => {
    if (canvas === replacement) fallBack();
  }).then((gpu) => {
    if (gpu) activateRenderer(gpu, replacement);
  }).catch(() => {
    // Canvas 2D keeps the same flight controls if the adapter or shader fails.
  });
}
