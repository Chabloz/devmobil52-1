import Circle from "./class/Circle";
import Keyboard from "./class/Keyboard";
import MainLoop from "mainloop.js";
import { TAU } from "./lib/math";
import Tweens, {easings} from "./class/Tweens";

const keyboard = new Keyboard();
const tweens = new Tweens();

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

function getAngleFromKey() {
  switch(true) {
    case keyboard.isKeyPressed('KeyW'): return TAU / 4;
    case keyboard.isKeyPressed('KeyS'): return TAU * 3/ 4;
    case keyboard.isKeyPressed('KeyA'): return 0;
    case keyboard.isKeyPressed('KeyD'): return TAU / 2;
    default: return false;
  }
}

const circles = [];
let indCircle = 0;
for (const easing of easings) {
  indCircle++;
  const circle = new Circle({
    position: {x: 0, y: 30 * indCircle + 10},
    radius: 20,
    color: 'tomato',
    velocity: {x: 0.1, y: 0}
  });
  tweens.create({
    from: 20,
    to: 500,
    duration: 2000,
    easing,
    yoyo: true,
    progress: (val) => {
      circle.position.x = val;
    }
  });

  tweens.create({
    to: 360,
    duration: 2000,
    loop: true,
    progress: (hue) => {
      circle.color = `hsl(${hue}, 100%, 50%)`;
    }
  });

  circles.push(circle);
}



function tickPhysic(dt) {
  // circle.update(dt);
  tweens.tick(dt);
}

function tickRender() {
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  for (const circle of circles) {
    circle.draw(ctx);
  }
}

MainLoop
  .setUpdate(tickPhysic)
  .setDraw(tickRender)
  .start();