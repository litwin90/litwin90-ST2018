const isPositiveNamber = require('./helpFunctions/isPositiveNumber');
const keysInObj = require('./helpFunctions/keys');
const identity = require('./helpFunctions/identityFunction');

function find(collection, predicate = identity, fromIndex = 0) {
    const collectionIsString = typeof collection === 'string';
    const collectionIsObject = typeof collection === 'object';
    const collectionIsNull = collection === null;
    const predicateIsFunction = typeof predicate === 'function';
    let from = fromIndex;

    // check if collection is an object or a string but not a null
    if ((!collectionIsObject && !collectionIsString) || collectionIsNull) {
        return;
    }

    // check if predicate is function
    if (!predicateIsFunction) {
        return;
    }

    // check if from is object but not a null
    if (typeof from === 'object' && from !== null) {
        return;
    }

    // check if fromIndex is positive namber
    if (!isPositiveNamber(from)) {
        from = 0;
    }

    const keys = keysInObj(collection);

    for (let i = from; i < keys.length; i += 1) {
        if (predicate(collection[keys[i]], i, collection[keys[i]])) {
            return collection[keys[i]];
        }
    }

    return;
}

module.exports = find;
