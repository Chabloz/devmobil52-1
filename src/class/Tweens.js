const makeEaseOut = (timing) => (timeFraction) => 1 - timing(1 - timeFraction);

const makeEaseInOut = (timing) => (timeFraction) => {
  if (timeFraction < .5) return timing(2 * timeFraction) / 2;
  return (2 - timing(2 * (1 - timeFraction))) / 2;
}
const easingFct = new Map();

easingFct.set('linear', timeFraction => timeFraction);
easingFct.set('quad', timeFraction => timeFraction ** 2);
easingFct.set('cubic', timeFraction => timeFraction ** 3);
easingFct.set('circ', timeFraction => 1 - Math.sin(Math.acos(timeFraction)));
easingFct.set('back', timeFraction => {
  return Math.pow(timeFraction, 2) * (2.5 * timeFraction - 1.5);
});
easingFct.set('bounce', timeFraction => {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
});
easingFct.set('elastic', timeFraction => {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(31.415926535 * timeFraction)
});

easingFct.set('quadOut', makeEaseOut(easingFct.get('quad')));
easingFct.set('cubicOut', makeEaseOut(easingFct.get('cubic')));
easingFct.set('circOut', makeEaseOut(easingFct.get('circ')));
easingFct.set('backOut', makeEaseOut(easingFct.get('back')));
easingFct.set('bounceOut', makeEaseOut(easingFct.get('bounce')));
easingFct.set('elasticOut', makeEaseOut(easingFct.get('elastic')));

easingFct.set('quadInOut', makeEaseInOut(easingFct.get('quad')));
easingFct.set('cubicInOut', makeEaseInOut(easingFct.get('cubic')));
easingFct.set('circInOut', makeEaseInOut(easingFct.get('circ')));
easingFct.set('backInOut', makeEaseInOut(easingFct.get('back')));
easingFct.set('bounceInOut', makeEaseInOut(easingFct.get('bounce')));
easingFct.set('elasticInOut', makeEaseInOut(easingFct.get('elastic')));

export const easings = [...easingFct.keys()];

export default class Tweens {

  constructor() {
    this.tweens = new Set();
  }

  create({
      from = 0,
      to = 1,
      duration = 1000,
      progress = (val) => {},
      easing = 'linear',
      loop = false,
      yoyo = false,
    }) {
    const easingFn = easingFct.get(easing);
    const tween = { from, to, duration, progress, time: 0, easing: easingFn, loop, yoyo };
    this.tweens.add(tween);
  }

  tick(dt) {
    for (const tween of this.tweens) {
      tween.time += dt;
      const timefactor = Math.min(tween.time / tween.duration, 1);
      const val = (tween.to - tween.from) * tween.easing(timefactor) + tween.from;
      tween.progress(val);
      if (timefactor === 1) {
        if (tween.yoyo) {
          const tmp = tween.to;
          tween.to = tween.from;
          tween.from = tmp;
          tween.time = 0;
        } else if (tween.loop) {
          tween.time = 0;
        } else {
          this.tweens.delete(tween);
        }

      }
    }
  }
}