const push = require('./helpFunctions/push');
const isArrayLike = require('./helpFunctions/isArrayLike');

function zip(...args) {
    const resultArr = [];
    let maxLengh = 0;
    // check for correct arrays in params
    // & max length of elements
    for (let i = 0; i < args.length; i += 1) {
        if (!isArrayLike(args[i])) {
            return [];
        }
        if (args[i].length > maxLengh) {
            maxLengh = args[i].length;
        }
    }

    for (let i = 0; i < args.length; i += 1) {
        for (let j = 0; j < maxLengh; j += 1) {
            resultArr[j] = (resultArr.length < j + 1)
                ? ([args[i][j]])
                : (push(resultArr[j], args[i][j]));
        }
    }
    return resultArr;
}

module.exports = zip;
