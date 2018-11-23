const checkForNuber = require('./checkForNuber');

function checkForNumberNotZero(val, errMessege) {
    checkForNuber(val);
    if (val === 0) {
        throw new Error(errMessege);
    }
    return true;
}

module.exports = checkForNumberNotZero;
