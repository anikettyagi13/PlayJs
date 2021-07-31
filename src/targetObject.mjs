import { validTransforms } from "./utils/AcceptableParameters.mjs";
import { pxPostfix } from "./utils/AcceptableParameters.mjs";
import { degPostfix } from "./utils/AcceptableParameters.mjs";
import {
  validAnimations,
  defaultTransforms,
} from "./utils/AcceptableParameters.mjs";
import { decomposeValue } from "./utils/utils.mjs";
import { toArray } from "./utils/utils.mjs";

function getFromTransforms(obj, params, animations) {
  for (var animation of animations) {
    if (validTransforms.includes(animation)) {
      obj[animation] = Array.isArray(params[animation])
        ? typeof params[animation][0] === 'string'
          ? decomposeValue(params[animation][0])
          : params[animation][0]
        : obj[animation]
    }
  }
  return obj
}

function getAllTransforms(transform, animations, params) {
  var values = transform.split('(')[1].split(')')[0].split(',')
  var a = values[0]
  var b = values[1]
  var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
  let obj = Object.assign({}, defaultTransforms)
  obj['rotateZ'] = angle
  if (!transform.includes('matrix3d')) {
    let splited = transform.split('(')[1].split(', ')
    for (var i = 0; i < 6; i++) {
      if (i == 0 && !animations.includes('scaleX')) {
        obj['scaleX'] = Number(splited[i])
      } else if (i == 1 && !animations.includes('skewY')) {
        obj['skewY'] = Number(splited[i])
      } else if (i == 2 && !animations.includes('skewX')) {
        obj['skewX'] = Number(splited[i])
      } else if (i == 3 && !animations.includes('scaleY')) {
        obj['scaleY'] = Number(splited[i])
      } else if (i == 4 && !animations.includes('translateX')) {
        obj['translateX'] = Number(splited[i])
      } else if (i == 5 && !animations.includes('translateY')) {
        obj['translateY'] = Number(splited[i].split(')')[0])
      }
    }
  }
  obj = getFromTransforms(obj, params, animations)
  return obj
}

function getInitialTransforms(styles, animations, params) {
  var transform = styles.transform
  if (transform != 'none') {
    return getAllTransforms(transform, animations, params)
  } else {
    let obj = Object.assign({}, defaultTransforms)
    obj = getFromTransforms(obj, params, animations)
    return obj
  }
}

function addInitialState(element, animations, params) {
  var styles = getComputedStyle(element.target)
  element.animations = getInitialTransforms(styles, animations, params)
  for (let i of validAnimations) {
    if (!validTransforms.includes(i) && animations.includes(i))
      if (i === 'opacity') {
        element.animations[i] = Array.isArray(params[i])
          ? params[i][0]
          : styles[i]
      } else if (i === 'backgroundColor') {
        element.animations[i] = Array.isArray(params[i])
          ? backgroundColorFromRGB(params[i][0])
          : backgroundColorFromRGB(styles[i])
      } else if (i === 'd' && element.target instanceof SVGElement) {
        element.animations[i] = decomposeValue(element.target.getAttribute('d'))
      } else {
        element.animations[i] = Array.isArray(params[i])
          ? typeof params[i][0] === 'string'
            ? decomposeValue(params[i][0])
            : params[i][0]
          : Number(styles[i].split('px')[0])
      }
  }
  return Object.assign({}, element.animations)
}
export function backgroundColorFromRGB(rgb) {
  try {
    if (typeof rgb === 'function') {
      throw new Error('backgroundColor cannot be a function')
    }
    if (typeof rgb == 'string') {
      let color = rgb.split('(')[1].split(',')
      return {
        red: Number(color[0]),
        green: Number(color[1]),
        blue: Number(color[2].split(')')[0]),
      }
    } else return rgb
  } catch (e) {
    console.error(e)
  }
}

function getValues(value, parameter) {
  if (Array.isArray(value)) value = value[1]
  if (typeof value === 'string') {
    if (parameter === 'backgroundColor') {
      return { value: backgroundColorFromRGB(value), isAttribute: false }
    } else if (parameter !== 'd') {
      return { value: decomposeValue(value), isAttribute: false }
    } else {
      return { value: decomposeValue(value), isAttribute: true }
    }
  }
  return { value: value, isAttribute: false }
}

function getAnimations(params) {
  let animations = []
  let uselessObj = {}
  for (let i in params) {
    let postfix = ''
    if (degPostfix.includes(i)) postfix = 'deg'
    if (pxPostfix.includes(i)) {
      if (typeof params[i] === 'string' && params[i].includes('%')) {
        postfix = '%'
        uselessObj[i] = Number(params[i].substring(0, params[i].length - 1))
      } else if (typeof params[i] === 'string' && params[i].includes('px')) {
        postfix = 'px'
        uselessObj[i] = Number(params[i].substring(0, params[i].length - 2))
      } else {
        uselessObj[i] = params[i]
        postfix = 'px'
      }
    }
    if (uselessObj[i] === undefined) uselessObj[i] = params[i]
    if (validAnimations.includes(i)) {
      let v = getValues(uselessObj[i], i)
      let element = {
        animation: i,
        value: typeof v.value === 'function' ? v.value() : v.value,
        valuePassed: v.value,
        isAttribute: v.isAttribute,
        timeExpired: null,
        delayTimeExpired: null,
        passedIteration: 0,
        previousTime: null,
        postfix,
        returnToInitial: params.returnToInitial,
        isPlaying: false,
        iteration: params.iteration,
        startTime: 0,
      }
      animations.push(element)
    }
  }
  return animations
}
export function getAllTargets(target, delay, duration, animations, play, params) {
  try {
    let targets = []

    if (Array.isArray(target)) {
      for (var i = 0; i < target.length; i++) {
        let delayNow = Array.isArray(delay) ? delay[i] : delay
        let durationNow = Array.isArray(duration) ? duration[i] : duration
        let delayEndNow = Array.isArray(params.endDelay)
          ? params.endDelay[i]
          : params.endDelay
        let playNow = Array.isArray(params.play) ? params.play[i] : params.play
        getTargetUtils(
          target[i],
          delayNow,
          durationNow,
          playNow,
          delayEndNow,
          params.whenVisible,
          params.iteration,
        )
      }
    } else {
      getTargetUtils(
        target,
        delay,
        duration,
        params.play,
        params.endDelay,
        params.whenVisible,
        params.iteration,
      )
    }

    function getTargetUtils(
      target,
      delay,
      duration,
      play,
      delayEnd,
      whenVisible,
      iteration,
    ) {
      let elements = document.querySelectorAll(target)
      elements = toArray(elements)
      let elementObject = []
      for (let i = 0; i < elements.length; i++) {
        let element = {
          target: elements[i],
          delay: delay + params.late * i,
          play: Array.isArray(play) ? play[0] : play,
          duration: duration,
          direction: params.direction,
          loop: params.loop,
          endDelay: delayEnd,
          whenVisible,
          durationInSeconds: duration / 1000,
          animationInstances: getAnimations(params),
          timeExpired: 0,
        }
        element.animations = addInitialState(element, animations, params)
        element.InitialState = Object.assign({}, element.animations)
        element.finalState = Array.from(element.animationInstances)
        elementObject.push(element)
      }
      targets = targets.concat(elementObject)
    }
    return targets
  } catch (e) {
    console.error(e)
  }
}
