const leave = require('./helpFunctions/leave');

function pick(obj, path) {
    return leave(obj, path);
}

module.exports = pick;
