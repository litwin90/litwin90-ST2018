function isArrayLike(val) {
    if (typeof val !== 'object') {
        return false;
    }
    if (val === null) {
        return false;
    }
    if (val.length === undefined) {
        return false;
    }
    return true;
}

module.exports = isArrayLike;
