export default class Keyboard {

  constructor() {
    this.keys = new Set();
    document.body.addEventListener('keydown', (e) => {
      this.keys.add(e.code);
    });
    document.body.addEventListener('keyup', (e) => {
      this.keys.delete(e.code);
    });
  }

  isKeyPressed(keyCode) {
    return this.keys.has(keyCode);
  }
}