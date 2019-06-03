## ⭐️ What

Compare any type as isEqual but only numbers approximately.

Deal with the famous IEEE754 problem.

Built for test frameworks and math calculation.

## 📦 Get Started

**Installation**

```shell
npm install is-equal-approx
# or
yarn add is-equal-approx
```

**Usage**

`isEqualApprox(a, b, [delta = 1e-5])`

```javascript
// * there are two functions
// * support cjs and esm
// * support object recursion way

// * ---------------- cjs
const { isEqualApprox, isEqualApproxNum } = require('is-equal-approx');
isEqualApprox([0.1 + 0.2], [0.3]); // => true

// * ---------------- esm
import isEqualApprox from 'is-equal-approx';
isEqualApprox(0.1 + 0.2, 0.3); // => true
```

---

## 💡 Why

IEEE754 problem.

```javascript
0.2 + 0.1 === 0.30000000000000004;
Math.sin(Math.PI) === 1.2246467991473532e-16;
```

It's really annoying while doing test or calculation.  
So I write the lib to save some time.

## 📖 Description

there are two methods

-   `isEqualApproxNum`
-   `isEqualApprox`

`isEqualApproxNum` will only check two number types.

`isEqualApprox` is a wrapper of `isEqualApproxNum`,  
which will check _any_ type of data you pass auto-recursively,  
and call `isEqualApproxNum` while meet number.

(real Number. number string is not well tested and supported)

**Rules**

`NaN` is considered equal.

`number` will check approximately by delta.

Else it should run like `lodash.isEqual`,

---

## ⌨️ Contribution

```shell
# git clone and cd into it
git clone https://github.com/seognil-lab/deep-include-partial

# npm command
npm i
npm run test:watch
```

---

## 📜 References

https://0.30000000000000004.com/

---

## 🕗 TODO
