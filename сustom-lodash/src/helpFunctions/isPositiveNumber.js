function isPositiveNumber(val) {
    const isNumber = typeof (val) === 'number' && !Number.isNaN(val);
    const isPositive = val >= 0;
    if (isNumber && isPositive) {
        return true;
    }
    return false;
}

module.exports = isPositiveNumber;
