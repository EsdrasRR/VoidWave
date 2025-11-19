// player.js - Player class (position, movement, render as placeholder sprite)
import { length } from './utils.js';

export class Player {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.w = 10; 
    this.h = 10;
    this.speed = 80; // pixels per second
    // color used for placeholder sprite
    this.color = '#ffdd55';

    this._sprite = null;
  }

  update(dt, input) {
    const dir = input.getDir();
    let dx = dir.dx;
    let dy = dir.dy;

    // normalize diagonal movement to keep constant speed
    if (dx !== 0 && dy !== 0) {
      const inv = 1 / Math.sqrt(2);
      dx *= inv;
      dy *= inv;
    }

    // move
    this.x += dx * this.speed * dt;
    this.y += dy * this.speed * dt;
  }

  render(ctx) {
    ctx.save();

    // center rect
    const px = Math.round(this.x - this.w / 2);
    const py = Math.round(this.y - this.h / 2);

    // simple ship shape built from small rectangles to keep a pixel-art feeling
    // body
    ctx.fillStyle = this.color;
    ctx.fillRect(px + 2, py + 0, this.w - 4, this.h);
    // cockpit
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 4, py + 2, 2, 2);
    // thrusters
    ctx.fillStyle = '#ffaa33';
    ctx.fillRect(px + 0, py + (this.h/2) - 1, 2, 2);
    ctx.fillRect(px + this.w - 2, py + (this.h/2) - 1, 2, 2);

    ctx.restore();
  }
}
