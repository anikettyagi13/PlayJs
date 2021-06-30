import {
  easeInOutQuad,
  easeOutCirc,
  easeInOutCubic,
  easeInCubic,
  easeOutSine,
  easeInExpo,
  easeInOutExpo,
  easeOutExpo,
  easeInOutSine,
  easeInSine,
  easeOutCubic,
  easeInOutCirc,
  easeInCirc,
  easeOutQuad,
  easeInElastic,
  easeOutElastic,
  easeInOutElastic,
  easeInQuad,
  easeLinear,
} from "./EasingFunctions.mjs";

export const acceptableParameters = [
  "targets",
  "duration",
  "animation",
  "delay",
  "late",
  "play",
  "direction",
  "endDelay",
  "whenVisible",
  "threshold",
  "iteration",
];

export function initialParameters(i) {
  switch (i) {
    case "targets":
      return "body";
    case "duration":
      return 1000;
    case "animation":
      return "ease-out-elastic";
    case "delay":
      return 0;
    case "late":
      return 300;
    case "play":
      return true;
    case "direction":
      return "normal";
    case "endDelay":
      return 0;
    case "whenVisible":
      return true;
    case "threshold":
      return 0.1;
    case "iteration":
      return 1;
  }
}

export function animationFunctions(i) {
  switch (i) {
    case "ease-in-out":
    case "ease-in-out-elastic":
      return () => easeInOutElastic;
    case "ease-in":
    case "ease-in-elastic":
      return () => easeInElastic;
    case "ease-out-elastic":
    case "ease-out":
      return () => easeOutElastic;
    case "ease-in-quad":
      return () => easeInQuad;
    case "ease-out-quad":
      return () => easeOutQuad;
    case "ease-in-out-quad":
      return () => easeInOutQuad;
    case "ease-in-circular":
      return () => easeInCirc;
    case "ease-out-circular":
      return () => easeOutCirc;
    case "ease-in-out-circular":
      return () => easeInOutCirc;
    case "ease-in-cubic":
      return () => easeInCubic;
    case "ease-out-cubic":
      return () => easeOutCubic;
    case "ease-in-out-cubic":
      return () => easeInOutCubic;
    case "ease-in-sine":
      return () => easeInSine;
    case "ease-out-sine":
      return () => easeOutSine;
    case "ease-in-out-sine":
      return () => easeInOutSine;
    case "ease-in-expo":
      return () => easeInExpo;
    case "ease-out-sine":
      return () => easeOutExpo;
    case "ease-in-out-sine":
      return () => easeInOutExpo;
    case "ease-linear":
      return () => easeLinear;
    default:
      return () => easeOutElastic;
  }
}

export const degPostfix = ["rotateX", "rotateY", "rotateZ", "skewX", "skewY"];
export const pxPostfix = [
  "translateX",
  "translateY",
  "translateZ",
  "scaleX",
  "scaleY",
  "scaleZ",
  "borderRadius",
];

export const validAnimations = [
  "translateX",
  "translateY",
  "translateZ",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skewX",
  "skewY",
  "perspective",
  "opacity",
  "backgroundColor",
  "borderRadius",
  "d",
];

export const defaultTransforms = {
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
};
export const validTransforms = [
  "translateX",
  "translateY",
  "translateZ",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scaleX",
  "scaleY",
  "scaleZ",
  "skewX",
  "skewY",
  "perspective",
];
