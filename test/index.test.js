const { assert } = require('chai');
const { isEqualApprox } = require('../dist/');

const checkEqualApprox = (data, comp, equal, delta) =>
    assert(isEqualApprox(data, comp, delta) === equal, 'error');

describe('isEqualApprox', () => {
    it('delta by default (1e-5)', () => {
        checkEqualApprox(0.1 + 0.2, 0.3, true);
        checkEqualApprox(0.4, 0.3, false);
    });

    it('delta passby', () => {
        checkEqualApprox(10, 10.2, true, 0.3);
        checkEqualApprox(10, 10.2, false, 0.1);
    });

    it('check Array, bundle 1', () => {
        checkEqualApprox([0.1 + 0.2, 1e-8], [0.3, 1e-9], true);
        checkEqualApprox([0.1 + 0.2, 1e-8], [0.3, 1e-9], false, 1e-11);
    });

    it('check Array, bundle 2', () => {
        checkEqualApprox([1, 2], [1, 3], false);
        checkEqualApprox([1, 2], [1, 3], true, 10);
    });

    it('check Object, bundle 1', () => {
        const a = { x: 0.1 + 0.2, y: 1e-8 };
        const b = { x: 0.3, y: 1e-9 };
        checkEqualApprox(a, b, true);
        checkEqualApprox(a, b, false, 1e-11);
    });

    it('check Object, bundle 2', () => {
        checkEqualApprox({ x: 1, y: 2 }, { x: 1, y: 3 }, false);
        checkEqualApprox({ x: 1, y: 2 }, { x: 1, y: 3 }, true, 10);
    });

    // * ----------------

    it('object.array, diff is in array', () => {
        const a = { x: [0.1 + 0.2, 1e-8], y: 1 };
        const b = { x: [0.3, 1e-9], y: 1 };
        checkEqualApprox(a, b, true);
        checkEqualApprox(a, b, false, 1e-11);
    });

    it('object.array, diff is out array', () => {
        const a = { x: [1, 2], y: 1 };
        const b = { x: [1, 2], y: 3 };
        checkEqualApprox(a, b, false);
        checkEqualApprox(a, b, true, 10);
    });

    it('array.object, diff is in array', () => {
        const a = [{ x: [0.1 + 0.2, 1e-8], y: 1 }, 2];
        const b = [{ x: [0.3, 1e-9], y: 1 }, 2];
        checkEqualApprox(a, b, true);
        checkEqualApprox(a, b, false, 1e-11);
    });

    it('Marray.object, diff is out array', () => {
        const a = [{ x: [1, 2], y: 3 }, 4];
        const b = [{ x: [1, 2], y: 3 }, 5];
        checkEqualApprox(a, b, false);
        checkEqualApprox(a, b, true, 10);
    });

    it('one simple type, not number or object', () => {
        checkEqualApprox('asd', 'asd', true);
        checkEqualApprox('asd', 'qwe', false);

        checkEqualApprox(true, true, true);
        checkEqualApprox(true, false, false);

        checkEqualApprox(undefined, undefined, true);
        checkEqualApprox(undefined, 2, false);
    });

    it('simple type in object', () => {
        checkEqualApprox({ v: 'asd' }, { v: 'asd' }, true);
        checkEqualApprox({ v: 'asd' }, { v: 'qwe' }, false);

        checkEqualApprox({ v: true }, { v: true }, true);
        checkEqualApprox({ v: true }, { v: false }, false);

        checkEqualApprox({ v: undefined }, { v: undefined }, true);
        checkEqualApprox({ v: undefined }, { v: 2 }, false);
    });

    it('simple type in array', () => {
        checkEqualApprox(['asd'], ['asd'], true);
        checkEqualApprox(['asd'], ['qwe'], false);

        checkEqualApprox([true], [true], true);
        checkEqualApprox([true], [false], false);

        checkEqualApprox([undefined], [undefined], true);
        checkEqualApprox([undefined], [2], false);
    });

    it('NaN is considered equal', () => {
        checkEqualApprox(NaN, NaN, true);
        checkEqualApprox(NaN, 2, false);
    });

    it('NaN in object', () => {
        checkEqualApprox({ v: NaN }, { v: NaN }, true);
        checkEqualApprox({ v: NaN }, { v: 2 }, false);
    });
});
