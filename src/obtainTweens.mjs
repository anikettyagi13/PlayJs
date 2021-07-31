import { getAllTargets } from "./targetObject.mjs";
import { animationFunctions } from "./utils/AcceptableParameters.mjs";
import { initialParameters } from "./utils/AcceptableParameters.mjs";
import { validAnimations } from "./utils/AcceptableParameters.mjs";
import { acceptableParameters } from "./utils/AcceptableParameters.mjs";

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
export default function obtainTweens(params) {
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
  console.log(params.animationFunction)
  tweens.animationFunction = getAnimationFunction(params.animationFunction)
  return tweens
}
