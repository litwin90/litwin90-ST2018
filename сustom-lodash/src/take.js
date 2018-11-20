const isPositiveNumber = require('./helpFunctions/isPositiveNumber');
const filter = require('./filter');

function take(array, n = 1) {
    // check for n is positive number
    if (!isPositiveNumber(n)) {
        return [];
    }
    return filter(array, (element, index) => index < n);
}

module.exports = take;
