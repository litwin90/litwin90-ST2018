import isNumber from './isNumder.js';

export default function createCorrectNumber(num, arr) {
    let correctNumber = num;
    if (isNumber(correctNumber)) {
        if (correctNumber < 0) {
            correctNumber = 0;
        } else if (correctNumber > arr.length) {
            correctNumber %= arr.length;
        }
    } else {
        correctNumber = 0;
    }
    return correctNumber;
}
