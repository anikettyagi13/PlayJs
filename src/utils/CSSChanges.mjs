import { validTransforms } from "./AcceptableParameters.mjs";
import { mergeStringAndNumber } from "./utils.mjs";
export default function applyCSSChanges(i, j) {
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
