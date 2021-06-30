import { validTransforms } from "./AcceptableParameters.mjs";
import { mergeStringAndNumber } from "./utils.mjs";
export default function applyCSSChanges(i, j) {
  if (validTransforms.includes(j.animation)) {
    changeCSS(i.target, i.animations, "transform", j.postfix, false);
  } else {
    changeCSS(i.target, i.animations, j.animation, j.postfix, j.isAttribute);
  }
}

function changeCSS(target, properties, animation, postfix, isAttribute) {
  if (isAttribute) {
    target.setAttribute(animation, mergeStringAndNumber(properties[animation]));
  } else
    switch (animation) {
      case "transform":
        target.style.transform = `translate3d(${properties["translateX"]}px, ${properties["translateY"]}px, ${properties["translateZ"]}px ) scaleX(${properties["scaleX"]}) scaleY(${properties["scaleY"]}) scaleZ(${properties["scaleZ"]}) rotateX(${properties["rotateX"]}deg) rotateY(${properties["rotateY"]}deg) rotateZ(${properties["rotateZ"]}deg) perspective(${properties["perspective"]}px) skew(${properties["skewX"]}deg, ${properties["skewY"]}deg) `;
        break;
      case "backgroundColor":
        target.style[
          animation
        ] = `rgb(${properties[animation].red},${properties[animation].green},${properties[animation].blue})`;
        break;
      default:
        target.style[animation] = properties[animation] + postfix;
    }
}
