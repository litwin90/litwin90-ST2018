const isArrayLike = require('./isArrayLike');

function valueIsArrayOrString(val) {
    // check if val is an array || val is a string
    const arrayIsArray = isArrayLike(val);
    const arrayIsString = typeof (val) === 'string';
    if (!arrayIsArray && !arrayIsString) {
        return false;
    }
    return true;
}

module.exports = valueIsArrayOrString;
