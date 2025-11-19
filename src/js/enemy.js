// enemy.js - simple enemy manager & basic chase behavior
import { clamp, length } from './utils.js';

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 8;
    this.h = 8;
    this.speed = 45 + Math.random() * 20; // varied speed
    this.color = '#d14a4a';
  }

  update(dt, player) {
    // simple seek: move toward player
    const vx = player.x - this.x;
    const vy = player.y - this.y;
    const dist = Math.hypot(vx, vy) || 1;
    const nx = vx / dist;
    const ny = vy / dist;

    this.x += nx * this.speed * dt;
    this.y += ny * this.speed * dt;
  }

  render(ctx) {
    ctx.save();
    const px = Math.round(this.x - this.w / 2);
    const py = Math.round(this.y - this.h / 2);

    // simple pixel-ish enemy block
    ctx.fillStyle = this.color;
    ctx.fillRect(px, py, this.w, this.h);
    // eye
    ctx.fillStyle = '#000000';
    ctx.fillRect(px + 2, py + 2, 2, 2);

    ctx.restore();
  }
}

export class EnemyManager {
  constructor() {
    this.enemies = [];
    this._spawnTimer = 0;
    this._spawnInterval = 3.0; // seconds
  }

  update(dt, player) {
    // spawn logic: spawn at edges
    this._spawnTimer += dt;
    if (this._spawnTimer >= this._spawnInterval) {
      this._spawnTimer = 0;
      this.spawnAtEdge();
      // slowly speed up spawn rate a bit
      this._spawnInterval = Math.max(0.6, this._spawnInterval - 0.05);
    }

    // update each enemy
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      e.update(dt, player);

      // simple removal if overlaps player (placeholder for damage)
      const dx = e.x - player.x;
      const dy = e.y - player.y;
      if (Math.hypot(dx, dy) < (e.w + player.w) / 2) {
        // collision with player: remove enemy for now
        this.enemies.splice(i, 1);
      }
    }
  }

  spawnAtEdge() {
    // spawn outside an edge randomly
    const side = Math.floor(Math.random() * 4);
    const margin = 8;
    let x, y;
    switch (side) {
      case 0: // top
        x = Math.random() * 320;
        y = -margin;
        break;
      case 1: // right
        x = 320 + margin;
        y = Math.random() * 180;
        break;
      case 2: // bottom
        x = Math.random() * 320;
        y = 180 + margin;
        break;
      default: // left
        x = -margin;
        y = Math.random() * 180;
        break;
    }
    this.enemies.push(new Enemy(x, y));
  }

  render(ctx) {
    for (const e of this.enemies) e.render(ctx);
  }
}
