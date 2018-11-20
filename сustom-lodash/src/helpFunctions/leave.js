const includes = require('../includes');
const isArrayLike = require('../helpFunctions/isArrayLike');
const pickBy = require('../pickBy');
const chunk = require('../chunk');

function leave(obj, path, predFn = element => element) {
    let predicate = (source, value, element) => predFn(includes(source, element));

    // check if obj is array like
    if (isArrayLike(obj) || typeof obj === 'string') {
        predicate = (source, value, element) => predFn(includes(source, +element));
    }
    if (typeof path === 'string') {
        return pickBy(obj, predicate.bind(null, chunk(path, 1)));
    }
    return pickBy(obj, predicate.bind(null, path));
}

module.exports = leave;
