const keysInObj = require('./helpFunctions/keys');
const hasOwnProperty = require('./helpFunctions/hasOwnProperty');

function merge(obj = {}, ...source) {
    let local = obj;
    let isObject;
    let isOwnProperty;
    let currentProperty;
    let currentObj;
    if (typeof obj !== 'object' || obj === null) {
        local = {};
    }
    for (let i = 0; i < source.length; i += 1) {
        const localKeys = keysInObj(source[i]);
        for (let j = 0; j < localKeys.length; j += 1) {
            currentProperty = localKeys[j];
            currentObj = source[i];

            isObject = typeof currentObj[currentProperty] === 'object' && currentObj[currentProperty] !== null;
            isOwnProperty = hasOwnProperty(local, currentProperty);

            if (isObject && isOwnProperty) {
                local[currentProperty] = merge(local[currentProperty], currentObj[currentProperty]);
            } else {
                local[currentProperty] = currentObj[currentProperty];
            }
        }
    }

    return local;
}

module.exports = merge;
