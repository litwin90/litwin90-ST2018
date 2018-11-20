const push = require('./helpFunctions/push');
const keysInObj = require('./helpFunctions/keys');
const identity = require('./helpFunctions/identityFunction');

function filter(collection, predicate = identity) {
    let newArr = [];
    const collectionIsString = typeof collection === 'string';
    const collectionIsObject = typeof collection === 'object';
    const collectionIsNull = collection === null;
    const predicateIsFunction = typeof predicate === 'function';

    // check if collection is an object or a string but not a null
    if ((!collectionIsObject && !collectionIsString) || collectionIsNull) {
        return [];
    }

    // check if predicate is function
    if (!predicateIsFunction) {
        return [];
    }

    const keys = keysInObj(collection);

    for (let i = 0; i < keys.length; i += 1) {
        if (predicate(collection[keys[i]], i, collection)) {
            newArr = push(newArr, collection[keys[i]]);
        }
    }

    return newArr;
}

module.exports = filter;
