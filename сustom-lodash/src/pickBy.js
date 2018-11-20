const keysInObj = require('./helpFunctions/keys');
const identity = require('./helpFunctions/identityFunction');

function pickBy(obj, predicate = identity) {
    const answer = {};
    const keys = keysInObj(obj);
    const innerPredicate = (typeof predicate !== 'function') ? (() => true) : (predicate);

    for (let i = 0; i < keys.length; i += 1) {
        if (innerPredicate(obj[keys[i]], keys[i])) {
            answer[keys[i]] = obj[keys[i]];
        }
    }
    return answer;
}

module.exports = pickBy;
