function checkForNumber(val, errMessege) {
    if (typeof (val) !== 'number' || Number.isNaN(val)) {
        throw new Error(errMessege);
    }
    return true;
}

module.exports = checkForNumber;
