/* eslint-disable default-case */
/* eslint-disable no-duplicate-case */
const acceptableParameters = [
  'targets',
  'duration',
  'animationFunction',
  'delay',
  'late',
  'play',
  'direction',
  'endDelay',
  'whenVisible',
  'threshold',
  'iteration',
  'returnToInitial',
]

function initialParameters(i) {
  switch (i) {
    case 'targets':
      return 'body'
    case 'duration':
      return 1000
    case 'animationFunction':
      return 'ease-out-elastic'
    case 'delay':
      return 0
    case 'late':
      return 300
    case 'play':
      return true
    case 'direction':
      return 'normal'
    case 'endDelay':
      return 0
    case 'whenVisible':
      return true
    case 'threshold':
      return 0.1
    case 'iteration':
      return 1
    case 'returnToInitial':
      return false
  }
}

function animationFunctions(i) {
  switch (i) {
    case 'ease-in-out':
    case 'ease-in-out-elastic':
      return () => easeInOutElastic
    case 'ease-in':
    case 'ease-in-elastic':
      return () => easeInElastic
    case 'ease-out-elastic':
    case 'ease-out':
      return () => easeOutElastic
    case 'ease-in-quad':
      return () => easeInQuad
    case 'ease-out-quad':
      return () => easeOutQuad
    case 'ease-in-out-quad':
      return () => easeInOutQuad
    case 'ease-in-circular':
      return () => easeInCirc
    case 'ease-out-circular':
      return () => easeOutCirc
    case 'ease-in-out-circular':
      return () => easeInOutCirc
    case 'ease-in-cubic':
      return () => easeInCubic
    case 'ease-out-cubic':
      return () => easeOutCubic
    case 'ease-in-out-cubic':
      return () => easeInOutCubic
    case 'ease-in-sine':
      return () => easeInSine
    case 'ease-out-sine':
      return () => easeOutSine
    case 'ease-in-out-sine':
      return () => easeInOutSine
    case 'ease-in-expo':
      return () => easeInExpo
    case 'ease-out-expo':
      return () => easeOutExpo
    case 'ease-in-out-expo':
      return () => easeInOutExpo
    case 'ease-linear':
      return () => easeLinear
    default:
      return () => easeOutElastic
  }
}

const degPostfix = ['rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY']
const pxPostfix = [
  'translateX',
  'translateY',
  'translateZ',
  'scaleX',
  'scaleY',
  'scaleZ',
  'borderRadius',
  'width',
  'height',
]
const validAnimations = [
  'translateX',
  'translateY',
  'translateZ',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skewX',
  'skewY',
  'perspective',
  'opacity',
  'backgroundColor',
  'borderRadius',
  'd',
  'width',
  'height',
]
const defaultTransforms = {
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  skewX: 0,
  skewY: 0,
  perspective: 0,
}
const validTransforms = [
  'translateX',
  'translateY',
  'translateZ',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skewX',
  'skewY',
  'perspective',
]

function toArray(item) {
  if (Array.isArray(item)) {
    return item
  } else {
    return Array.from(item)
  }
}

function flattenArray(item) {
  if (!Array.isArray(item)) {
    return item
  } else {
    let array = []
    for (var i of item) {
      array.concat(flattenArray(i))
    }
    return array
  }
}

function decomposeValue(val, unit) {
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g
  var value = validateValue(val, unit) + ''
  return {
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: typeof val == 'string' || unit ? value.split(rgx) : [],
  }
}
function validateValue(val, unit) {
  if (/\s/g.test(val)) {
    return val
  }
  var originalUnit = ''
  var unitLess = originalUnit
    ? val.substr(0, val.length - originalUnit.length)
    : val
  if (unit) {
    return unitLess + unit
  }
  return unitLess
}

function mergeStringAndNumber(values) {
  var ans = ''
  let i = 0
  for (i; i < values.numbers.length; i++) {
    ans += values.strings[i]
    ans += values.numbers[i]
  }
  return (ans += values.strings[i])
}

function random(start, end) {
  return Math.random() * (end - start + 1) + start
}

// Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

function easeInElastic(t, b, c, d) {
  var s = 1
  var p = 0
  var a = c
  if (t == 0) return b
  if ((t /= d) == 1) return b + c
  if (!p) p = d * 0.3
  if (a < Math.abs(c)) {
    a = c
    var s = p / 4
  } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
  return (
    -(
      a *
      Math.pow(2, 10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p)
    ) + b
  )
}
function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b
}
function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b
  return (-c / 2) * (--t * (t - 2) - 1) + b
}
function easeInSine(t, b, c, d) {
  return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
}
function easeOutSine(t, b, c, d) {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b
}
function easeInOutSine(t, b, c, d) {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
}
function easeInExpo(t, b, c, d) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
}
function easeOutExpo(t, b, c, d) {
  return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
}
function easeInOutExpo(t, b, c, d) {
  if (t == 0) return b
  if (t == d) return b + c
  if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
  return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
}
function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
}
function easeOutCirc(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
}
function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
}
function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b
}
function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b
}
function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b
  return (c / 2) * ((t -= 2) * t * t + 2) + b
}

function easeInOutElastic(t, b, c, d) {
  var s = 1.70158
  var p = 0
  var a = c
  if (t == 0) return b
  if ((t /= d / 2) == 2) return b + c
  if (!p) p = d * (0.3 * 1.5)
  if (a < Math.abs(c)) {
    a = c
    var s = p / 4
  } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
  if (t < 1)
    return (
      -0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
      b
    )
  return (
    a *
      Math.pow(2, -10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
      0.5 +
    c +
    b
  )
}

function easeOutElastic(t, b, c, d) {
  var s = 1.70158
  var p = 0
  var a = c
  if (t == 0) return b
  if ((t /= d) == 1) return b + c
  if (!p) p = d * 0.3
  if (a < Math.abs(c)) {
    a = c
    var s = p / 4
  } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
  return (
    a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
    c +
    b
  )
}

function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b
}

function easeLinear(t, b, c, d) {
  return (c * t) / d + b
}

function applyCSSChanges(i, j) {
  if (validTransforms.includes(j.animation)) {
    changeCSS(i.target, i.animations, 'transform', j.postfix, false)
  } else {
    changeCSS(i.target, i.animations, j.animation, j.postfix, j.isAttribute)
  }
}

function changeCSS(target, properties, animation, postfix, isAttribute) {
  if (isAttribute) {
    target.setAttribute(animation, mergeStringAndNumber(properties[animation]))
  } else
    switch (animation) {
      case 'transform':
        target.style.transform = `translate3d(${
          typeof properties[`translateX`] === 'object'
            ? mergeStringAndNumber(properties[`translateX`])
            : properties[`translateX`]
        }${typeof properties['translateX'] === 'object' ? '' : 'px'}, ${
          typeof properties[`translateY`] === 'object'
            ? mergeStringAndNumber(properties[`translateY`])
            : properties[`translateY`]
        }${typeof properties['translateY'] === 'object' ? '' : 'px'}, ${
          typeof properties[`translateZ`] === 'object'
            ? mergeStringAndNumber(properties[`translateZ`])
            : properties[`translateZ`]
        }${typeof properties['translateZ'] === 'object' ? '' : 'px'} ) scaleX(${
          typeof properties[`scaleX`] === 'object'
            ? mergeStringAndNumber(properties[`scaleX`])
            : properties[`scaleX`]
        }) scaleY(${
          typeof properties[`scaleY`] === 'object'
            ? mergeStringAndNumber(properties[`scaleY`])
            : properties[`scaleY`]
        }) scaleZ(${
          typeof properties[`scaleZ`] === 'object'
            ? mergeStringAndNumber(properties[`scaleZ`])
            : properties[`scaleZ`]
        }) rotateX(${
          typeof properties[`rotateX`] === 'object'
            ? mergeStringAndNumber(properties[`rotateX`])
            : properties[`rotateX`]
        }${typeof properties['rotateX'] === 'object' ? '' : 'deg'}) rotateY(${
          typeof properties[`rotateY`] === 'object'
            ? mergeStringAndNumber(properties[`rotateY`])
            : properties[`rotateY`]
        }${typeof properties['rotateY'] === 'object' ? '' : 'deg'}) rotateZ(${
          typeof properties[`rotateZ`] === 'object'
            ? mergeStringAndNumber(properties[`rotateZ`])
            : properties[`rotateZ`]
        }${
          typeof properties['rotateZ'] === 'object' ? '' : 'deg'
        }) perspective(${
          typeof properties[`perspective`] === 'object'
            ? mergeStringAndNumber(properties[`perspective`])
            : properties[`perspective`]
        }${typeof properties['perspective'] === 'object' ? '' : 'px'}) skew(${
          typeof properties[`skewX`] === 'object'
            ? mergeStringAndNumber(properties[`skewX`])
            : properties[`skewX`]
        }${typeof properties['skewX'] === 'object' ? '' : 'deg'}, ${
          typeof properties[`skewY`] === 'object'
            ? mergeStringAndNumber(properties[`skewY`])
            : properties[`skewY`]
        }${typeof properties['skewY'] === 'object' ? '' : 'deg'}) `
        break
      case 'backgroundColor':
        target.style[
          animation
        ] = `rgb(${properties[animation].red},${properties[animation].green},${properties[animation].blue})`
        break
      default:
        target.style[animation] =
          typeof properties[animation] === 'object'
            ? mergeStringAndNumber(properties[animation])
            : properties[animation] + postfix
    }
}

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
function backgroundColorFromRGB(rgb) {
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
function getAllTargets(target, delay, duration, animations, play, params) {
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

function addMoreParameters(valid) {
  for (var i of acceptableParameters) {
    if (valid[i] === undefined) {
      valid[i] = initialParameters(i)
    }
  }
  return valid
}

function getValidParams(params) {
  let valid = {}
  for (var i of Object.keys(params)) {
    if (acceptableParameters.includes(i) || validAnimations.includes(i)) {
      valid[i] = params[i]
    }
  }
  valid = addMoreParameters(valid)
  return valid
}

// write function to get which animation function is to be used

function getAnimationFunction(animation) {
  return animationFunctions(animation)
}

function getAnimationsName(params) {
  var animations = []
  for (let i in params) {
    if (validAnimations.includes(i)) animations.push(i)
  }
  return animations
}
function obtainTweens(params) {
  let tweens = {}
  var params = getValidParams(params)
  tweens.targets = getAllTargets(
    params.targets,
    params.delay,
    params.duration,
    getAnimationsName(params),
    params.play,
    params,
  )
  tweens.threshold = params.threshold
  tweens.animationFunction = getAnimationFunction(params.animationFunction)
  return tweens
}

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
