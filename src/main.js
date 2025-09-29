import Circle from "./class/Circle";
import Keyboard from "./class/Keyboard";
import MainLoop from "mainloop.js";

const keyboard = new Keyboard();

const circle = new Circle({
  position: {x: 0, y: 0},
  radius: 300,
  color: 'tomato',
  velocity: {x: 0.1, y: 0.1}
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;



function tickPhysic(dt) {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  if (keyboard.isKeyPressed('KeyD')) {
    console.log(keyboard.keys);
    circle.update(dt);
  }
}

function tickRender() {
  circle.draw(ctx);
}

MainLoop
  .setUpdate(tickPhysic)
  .setDraw(tickRender)
  .start();
