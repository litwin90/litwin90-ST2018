const find = require('./find');
const keysInCollection = require('./helpFunctions/keys');

function includes(collection, value, fromIndex = 0) {
    let from = fromIndex;
    // check for fromIndex is object
    if (typeof from === 'object' && from !== null) {
        from = 0;
    }
    const result = find(collection, element => element === value, from) !== undefined;
    if (value === undefined) {
        const keys = keysInCollection(collection);
        for (let i = 0; i < keys.length; i += 1) {
            if (collection[keys[i]] === undefined) {
                return true;
            }
        }
    }
    return result;
}

module.exports = includes;
