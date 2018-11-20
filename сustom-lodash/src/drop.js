const isPositiveNumber = require('./helpFunctions/isPositiveNumber');
const filter = require('./filter');

function drop(array, n = 1) {
    // check for n is positive number
    if (!isPositiveNumber(n)) {
        return Array.from(array);
    }
    return filter(array, (element, index) => index >= n);
}

module.exports = drop;
