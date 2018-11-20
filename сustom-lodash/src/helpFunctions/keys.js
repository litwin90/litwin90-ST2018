/* eslint-disable no-restricted-syntax */
const push = require('./push');
const isArrayLike = require('./isArrayLike');

function keys(obj) {
    let arr = [];
    if (isArrayLike(obj)) {
        for (let i = 0; i < obj.length; i += 1) {
            arr = push(arr, i);
        }
    } else {
        for (const key in obj) {
            if (!(key in obj.__proto__)) {
                arr = push(arr, key);
            }
        }
    }
    return arr;
}

module.exports = keys;
