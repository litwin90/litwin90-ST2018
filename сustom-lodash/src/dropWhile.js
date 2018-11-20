const drop = require('./drop');
const valueIsArrayOrString = require('./helpFunctions/valueIsArrayOrString');
const identity = require('./helpFunctions/identityFunction');

function dropWhile(array = [], predicate = identity) {
    const predicateIsFunction = typeof predicate === 'function';
    let innerPredicate = predicate;
    // check if array param is array or string
    if (!valueIsArrayOrString(array)) {
        return [];
    }

    // check if predicate is a function
    if (!predicateIsFunction) {
        innerPredicate = () => false;
    }

    let index = array.length;
    for (let i = 0; i < array.length; i += 1) {
        if (!innerPredicate(array[i], i, array)) {
            index = i;
            break;
        }
    }
    return drop(array, index);
}

module.exports = dropWhile;
