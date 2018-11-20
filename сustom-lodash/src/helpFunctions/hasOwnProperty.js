function hasOwnProperty(obj, prop) {
    const objIsObj = typeof obj === 'object' && obj !== null;
    if (!objIsObj) {
        return false;
    }
    const hasProp = prop in obj;
    const propInPrototype = prop in obj.__proto__;
    if (objIsObj && !propInPrototype && hasProp) {
        return true;
    }
    return false;
}

module.exports = hasOwnProperty;
