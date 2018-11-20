const leave = require('./helpFunctions/leave');

function omit(obj, path) {
    return leave(obj, path, element => !element);
}

module.exports = omit;
