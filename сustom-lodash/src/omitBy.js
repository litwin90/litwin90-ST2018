const pickBy = require('./pickBy');
const identity = require('./helpFunctions/identityFunction');

function omitBy(obj, predicate = identity) {
    const innerPredicate = (typeof predicate !== 'function') ? (() => false) : ((value, key) => !predicate(value, key));

    return pickBy(obj, innerPredicate);
}

module.exports = omitBy;
