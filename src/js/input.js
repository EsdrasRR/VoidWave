// input.js - simple keyboard handler for WASD + Arrow keys
export class Input {
  constructor() {
    this.keys = new Set();
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
  }

  _onKeyDown(e) {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    this.keys.add(k);
    // prevent page scroll on arrows and space
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
      e.preventDefault();
    }
  }

  _onKeyUp(e) {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    this.keys.delete(k);
  }

  isDown(key) {
    // accept 'w','a','s','d' or 'arrowup','arrowleft', etc
    return this.keys.has(key);
  }

  // convenience directional values
  getDir() {
    let dx = 0, dy = 0;
    if (this.isDown('w') || this.isDown('ArrowUp')) dy -= 1;
    if (this.isDown('s') || this.isDown('ArrowDown')) dy += 1;
    if (this.isDown('a') || this.isDown('ArrowLeft')) dx -= 1;
    if (this.isDown('d') || this.isDown('ArrowRight')) dx += 1;
    return { dx, dy };
  }

  update() {
    // currently no internal state to update
  }

  destroy() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
  }
}
