import obtainTweens from "./src/obtainTweens.mjs";
import applyCSSChanges from "./src/utils/CSSChanges.mjs";
import { easeLinear } from "./src/utils/EasingFunctions.mjs";
import { random } from "./src/utils/utils.mjs";


function getNewChangesInString(j, playItems, target) {
  let number = [];
  for (let i = 0; i < j.value.numbers.length; i++) {
    if (target.animations[j.animation].numbers[i] === j.value.numbers[i]) {
      number[i] = j.value.numbers[i];
    } else
      number[i] = CallToAnimationFunction(
        playItems,
        j.timeExpired * 0.001,
        target.InitialState[j.animation].numbers[i],
        j.value.numbers[i] - target.InitialState[j.animation].numbers[i],
        target.durationInSeconds
      );
  }
  return { numbers: number, strings: j.value.strings };
}

function findObjOfAnimation(j, InitialState) {
  var value = j.value;
  j.value =
    typeof j.valuePassed === "function"
      ? j.valuePassed()
      : InitialState[j.animation];
  // j.timeExpired = 0;
  InitialState[j.animation] = value;
  return { j, InitialState };
}

function CallToAnimationFunction(playItems, t, b, c, d) {
  return playItems.animationFunction()(t, b, c, d);
}

function getChangedColor(i, j) {
  let changedColor = {};
  for (var color of ["red", "green", "blue"]) {
    changedColor[color] = Math.ceil(
      easeLinear(
        j.timeExpired * 0.001,
        i.InitialState.backgroundColor[color],
        j.value[color] - i.InitialState.backgroundColor[color],
        i.durationInSeconds
      )
    );
  }

  return changedColor;
}

function Animation(i, j, playItems) {
  let id = setInterval(() => {
    let play = typeof i.play == "function" ? i.play() : i.play;
    j.isPlaying = true;
    if (play) {
      if (j.delayTimeExpired < i.delay) {
        j.delayTimeExpired += 10;
      } else {
        j.timeExpired += 10;
        if (
          j.timeExpired >= i.duration &&
          j.timeExpired < i.duration + i.endDelay
        ) {
        } else {
          if (j.timeExpired >= i.duration) {
            let k = j.iteration === true ? true : j.iteration--;
            if (k === true || j.iteration > 0) {
              if (i.direction === "alternate") {
                let obj = findObjOfAnimation(j, i.InitialState, i.finalState);
                i.InitialState = obj.InitialState;
                j = Object.assign({}, obj.j);
              } else {
                j.value =
                  typeof j.valuePassed === "function"
                    ? j.valuePassed()
                    : j.value;
              }
              if (k === true || j.iteration) {
                j.timeExpired = 0;
              }
            } else {
              j.isPlaying = false;
              clearInterval(id);
            }
          }
          var change;
          if (j.animation === "backgroundColor") {
            let changedColor = getChangedColor(i, j);
            change = changedColor;
          } else if (i.target instanceof SVGElement && j.animation == "d") {
            change = getNewChangesInString(j, playItems, i);
          } else {
            change = CallToAnimationFunction(
              playItems,
              j.timeExpired * 0.001,
              i.InitialState[j.animation],
              (typeof j.value === "function"
                ? j.value(j.timeExpired)
                : j.value) - i.InitialState[j.animation],
              i.durationInSeconds
            );
          }
          i.animations[j.animation] = change;
          applyCSSChanges(i, j);
        }
      }
    }
  }, 10);
}

function createInstectionObserver(i, j, playItems) {
  let options = {
    threshold: playItems.threshold,
  };

  let observer = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting && !j.isPlaying) {
      Animation(i, j, playItems);
    }
  }, options);
  observer.observe(i.target);
}

function playNow(playItems) {
  for (let i of playItems.targets) {
    console.log(i);
    for (let j of i.animationInstances) {
      i.whenVisible
        ? createInstectionObserver(i, j, playItems)
        : Animation(i, j, playItems);
    }
  }
}

export function play(params) {
  var playItems = obtainTweens(params);
  playNow(playItems);
}
play.random = random;


play({
  targets: ".svg",
  translateX: [-250,0],
  opacity: [0, 1],
  endDelay:3500,
  animation: "ease-linear",
  duration: 500,
  iteration: true,
  whenVisible: false,
});
play({
  targets: ".helo",
  d: "M0.897461 0L89 39L0.897461 77L24 39L0.897461 0Z",
  delay: 500,
  duration: 3000,
  iteration:true,
  endDelay: 1000,
  whenVisible: false,
});
play({
  targets: ".svg",
  translateX: [0, 250],
  opacity: [1, 0],
  animation: "ease-linear",
  duration: 500,
  delay: 3500,
  iteration:true,
  endDelay: 3500,
  whenVisible: false,
});
play({
  targets: ".helo",
  d: "M0.897461 0L89 39L0.897461 77L65 39L0.897461 0Z",
  duration: 500,
  delay: 3500,
  iteration:true,
  endDelay: 3500,
  whenVisible: false,
});
