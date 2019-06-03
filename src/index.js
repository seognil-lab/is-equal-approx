import { isNumber, isObject, isEqual } from 'lodash/fp';

const isEqualApproxNum = (a, b, delta = 1e-5) =>
    a == b || (isNaN(a) && isNaN(b)) || Math.abs(a - b) < Math.abs(delta);

const isEqualApprox = (valA, valB, delta) => {
    if (isNumber(valA) && isNumber(valB)) {
        return isEqualApproxNum(valA, valB, delta);
    } else if (isObject(valA) && isObject(valB)) {
        if (Object.keys(valA).length !== Object.keys(valB).length) return false;
        for (const key in valB) {
            if (!isEqualApprox(valA[key], valB[key], delta)) return false;
        }
        return true;
    } else {
        // * string boolean undefined blahblah
        return isEqual(valA, valB);
    }
};

export default isEqualApprox;

export { isEqualApprox, isEqualApproxNum };
