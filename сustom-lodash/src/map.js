const push = require('./helpFunctions/push');
const keysInObj = require('./helpFunctions/keys');
const identity = require('./helpFunctions/identityFunction');

function map(collection, predicate = identity) {
    let newArr = [];
    let innerPredicate = predicate;
    const collectionIsString = typeof collection === 'string';
    const collectionIsObject = typeof collection === 'object';
    const collectionIsNull = collection === null;
    const predicateIsFunction = typeof innerPredicate === 'function';
    const predicateIsString = typeof innerPredicate === 'string';

    // check if collection is an object or a string but not a null
    if ((!collectionIsObject && !collectionIsString) || collectionIsNull) {
        return [];
    }

    // check if predicate is function
    if (!predicateIsFunction && !predicateIsString) {
        return [];
    }

    // check if predicate is string
    if (predicateIsString) {
        innerPredicate = element => element[predicate];
    }

    const keys = keysInObj(collection);

    if (Array.isArray(collection) || typeof collection === 'string') {
        for (let i = 0; i < keys.length; i += 1) {
            newArr = push(newArr, innerPredicate(collection[keys[i]], +keys[i], collection));
        }
    } else {
        for (let i = 0; i < keys.length; i += 1) {
            newArr = push(newArr, innerPredicate(collection[keys[i]], keys[i], collection));
        }
    }

    return newArr;
}

module.exports = map;
