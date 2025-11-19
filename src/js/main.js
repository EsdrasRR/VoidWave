// main.js - game bootstrap, loop, and wiring
import { Input } from './input.js';
import { Player } from './player.js';
import { EnemyManager } from './enemy.js';
import { clamp } from './utils.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { alpha: false });

const WIDTH = canvas.width;   // 320
const HEIGHT = canvas.height; // 180

// managers
const input = new Input();
const player = new Player(WIDTH / 2, HEIGHT / 2);
const enemies = new EnemyManager();

// basic FPS-independent loop (variable dt safe)
let last = performance.now();
function loop(now) {
  const dt = (now - last) / 1000; // seconds
  update(dt);
  render();
  last = now;
  requestAnimationFrame(loop);
}

function update(dt) {
  input.update(); // updates internal state if needed
  // update player with current input
  player.update(dt, input);

  // keep player on-screen (safety clamp)
  player.x = clamp(player.x, player.w / 2, WIDTH - player.w / 2);
  player.y = clamp(player.y, player.h / 2, HEIGHT - player.h / 2);

  // update enemies (they can spawn and chase)
  enemies.update(dt, player);

  // TODO: collisions, bullets, pickups, scoring...
}

function render() {
  // clear
  ctx.fillStyle = '#081018';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // draw player (player handles sprite or placeholder)
  player.render(ctx);

  // draw enemies
  enemies.render(ctx);

  // HUD (simple)
  ctx.fillStyle = '#ffffff';
  ctx.font = '8px monospace';
  ctx.fillText('WASD / Arrow keys to move', 6, HEIGHT - 6);
}

requestAnimationFrame(loop);
