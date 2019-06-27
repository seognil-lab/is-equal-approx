'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fp = require('lodash/fp');

var isEqualApproxNum = function isEqualApproxNum(a, b) {
  var delta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-5;
  return a == b || isNaN(a) && isNaN(b) || Math.abs(a - b) < Math.abs(delta);
};

var isEqualApprox = function isEqualApprox(valA, valB, delta) {
  if (fp.isNumber(valA) && fp.isNumber(valB)) {
    return isEqualApproxNum(valA, valB, delta);
  } else if (fp.isObject(valA) && fp.isObject(valB)) {
    if (Object.keys(valA).length !== Object.keys(valB).length) return false;

    for (var key in valB) {
      if (!isEqualApprox(valA[key], valB[key], delta)) return false;
    }

    return true;
  } else {
    // * string boolean undefined blahblah
    return fp.isEqual(valA, valB);
  }
};

exports.default = isEqualApprox;
exports.isEqualApprox = isEqualApprox;
exports.isEqualApproxNum = isEqualApproxNum;
//# sourceMappingURL=index.js.map
