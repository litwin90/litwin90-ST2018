const map = require('./map');

function toPairs(obj) {
    return map(obj, (element, key) => [key, element]);
}

module.exports = toPairs;
