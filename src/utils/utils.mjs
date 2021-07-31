
export function toArray(item) {
  if (Array.isArray(item)) {
    return item
  } else {
    return Array.from(item)
  }
}

export function flattenArray(item) {
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

export function decomposeValue(val, unit) {
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g
  var value = validateValue(val, unit) + ''
  return {
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: typeof val == 'string' || unit ? value.split(rgx) : [],
  }
}
export function validateValue(val, unit) {
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

export function mergeStringAndNumber(values) {
  var ans = ''
  let i = 0
  for (i; i < values.numbers.length; i++) {
    ans += values.strings[i]
    ans += values.numbers[i]
  }
  return (ans += values.strings[i])
}

export function random(start, end) {
  return Math.random() * (end - start + 1) + start
}
