const filter = require('./filter');
const identity = require('./helpFunctions/identityFunction');

function compact(array) {
    return filter(array, identity);
}

module.exports = compact;
