import obtainTweens from "./src/obtainTweens.mjs";
import applyCSSChanges from "./src/utils/CSSChanges.mjs";
import { easeLinear } from "./src/utils/EasingFunctions.mjs";
import { random } from "./src/utils/utils.mjs";


function getNewChangesInString(j, playItems, target) {
  try {
    let number = []
    for (let i = 0; i < j.value.numbers.length; i++) {
      if (
        (target.animations[j.animation].numbers[i] || 0) === j.value.numbers[i]
      ) {
        number[i] = j.value.numbers[i]
      } else
        number[i] = CallToAnimationFunction(
          playItems,
          j.timeExpired * 0.001,
          target.InitialState[j.animation].numbers[i] || 0,
          j.value.numbers[i] -
            (target.InitialState[j.animation].numbers[i] || 0),
          target.durationInSeconds,
        )
    }
    return { numbers: number, strings: j.value.strings }
  } catch (e) {
    console.error(e)
  }
}

function findObjOfAnimation(j, InitialState) {
  var value = j.value
  j.value =
    typeof j.valuePassed === 'function'
      ? j.valuePassed()
      : InitialState[j.animation]
  InitialState[j.animation] = value
  return { j, InitialState }
}

function CallToAnimationFunction(playItems, t, b, c, d) {
  return playItems.animationFunction()(t, b, c, d)
}

function getChangedColor(i, j) {
  let changedColor = {}
  for (var color of ['red', 'green', 'blue']) {
    changedColor[color] = Math.ceil(
      easeLinear(
        j.timeExpired * 0.001,
        i.InitialState.backgroundColor[color],
        j.value[color] - i.InitialState.backgroundColor[color],
        i.durationInSeconds,
      ),
    )
  }
  return changedColor
}

function getIfToDelay(timeDelayExpired, delay) {
  return timeDelayExpired < delay ? 'delay' : 'normal'
}
function getIfToEndDelay(timeExpired, endDelay, duration) {
  if (timeExpired > duration + endDelay) {
    return 'endPlay'
  } else if (timeExpired > duration && timeExpired < endDelay + duration) {
    return 'endDelay'
  } else {
    return 'play'
  }
}
function calculateNewTimePassed(timeNow, previousTime) {
  return timeNow - previousTime
}
function removePlay(j, i, play) {
  let k = j.iteration === true ? true : --j.iteration
  if (k === true || k > 0) {
    if (i.direction === 'alternate') {
      let obj = findObjOfAnimation(j, i.InitialState, i.finalState)
      i.InitialState = obj.InitialState
      j = obj.j
    } else {
      j.value = typeof j.valuePassed === 'function' ? j.valuePassed() : j.value
    }
    j.timeExpired = 0
  } else {
    if (j.returnToInitial) {
      i.animations[j.animation] = i.InitialState[j.animation]
      applyCSSChanges(i, j)
    }
    play = false
  }
  return { j, i, play }
}

function Animation(i, j, playItems, t) {
  try {
    let play = typeof i.play === 'function' ? i.play(t - j.startTime) : i.play
    let playRef = play
    if (play) {
      j.isPlaying = true
      if (!(j.delayTimeExpired || j.timeExpired)) {
        j.timeExpired = j.delayTimeExpired = 0
      }
      if (!j.previousTime) {
        j.previousTime = t
      }
      let newFrameTime = calculateNewTimePassed(t, j.previousTime)
      let whatToDo = getIfToDelay(j.delayTimeExpired, i.delay)
      let ifEndDelay = ''
      switch (whatToDo) {
        case 'delay':
          j.delayTimeExpired += newFrameTime
          break
        default:
          j.timeExpired += newFrameTime
          ifEndDelay = getIfToEndDelay(j.timeExpired, i.endDelay, i.duration)
      }
      if (ifEndDelay === 'endPlay') {
        let obj = removePlay(j, i, play)
        j = obj.j
        i = obj.i
        play = obj.play
      } else if (ifEndDelay === 'play') {
        let change
        if (j.animation === 'backgroundColor') {
          let changedColor = getChangedColor(i, j)
          change = changedColor
        } else if (typeof i.animations[j.animation] === 'object') {
          change = getNewChangesInString(j, playItems, i)
        } else {
          change = CallToAnimationFunction(
            playItems,
            j.timeExpired * 0.001,
            i.InitialState[j.animation],
            (typeof j.value === 'function' ? j.value(j.timeExpired) : j.value) -
              i.InitialState[j.animation],
            i.durationInSeconds,
          )
        }
        i.animations[j.animation] = change
        applyCSSChanges(i, j)
      }
      if (play) {
        window.requestAnimationFrame((t) => Animation(i, j, playItems, t))
      }
      j.previousTime = t
    }
    if (!playRef) {
      window.requestAnimationFrame((t) => Animation(i, j, playItems, t))
      j.previousTime = t
    }
  } catch (e) {
    console.error(e)
  }
}

function createInstectionObserver(i, j, playItems) {
  let options = { threshold: playItems.threshold }
  let observer = new IntersectionObserver((entry) => {
    j.isIntersecting = entry[0].isIntersecting
    if (entry[0].isIntersecting && !j.isPlaying) {
      window.requestAnimationFrame((t) => {
        j.startTime = t
        Animation(i, j, playItems, t)
      })
    }
  }, options)
  observer.observe(i.target)
}
function playNow(playItems) {
  for (let i of playItems.targets) {
    for (let j of i.animationInstances) {
      i.whenVisible
        ? createInstectionObserver(i, j, playItems)
        : window.requestAnimationFrame((t) => {
            j.isIntersecting = true
            j.startTime = t
            Animation(i, j, playItems, t)
          })
    }
  }
}
export function play(params) {
  try {
    var playItems = obtainTweens(params)
    playNow(playItems)
  } catch (e) {
    console.error(e)
  }
}

play.random = random
play.version = '1.0.1'
