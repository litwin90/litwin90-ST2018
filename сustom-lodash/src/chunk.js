const push = require('./helpFunctions/push');
const valueIsArrayOrString = require('./helpFunctions/valueIsArrayOrString');
const isPositiveNumber = require('./helpFunctions/isPositiveNumber');

function chunk(array = [], size = 1) {
    const sizeIsZero = size === 0;
    let resultArr = [];
    // check for an array or a string
    if (!valueIsArrayOrString(array)) {
        return [];
    }

    // check for correct size
    if (!isPositiveNumber(size) || sizeIsZero) {
        return [];
    }

    for (let i = 0; i < array.length; i += 1) {
        if (resultArr.length === 0 || resultArr[resultArr.length - 1].length === size) {
            resultArr = push(resultArr, []);
        }
        resultArr[resultArr.length - 1] = push(resultArr[resultArr.length - 1], array[i]);
    }
    return resultArr;
}

module.exports = chunk;
