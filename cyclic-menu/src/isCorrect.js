import isNumber from './isNumder.js';

export default function isCorrect(num, arr) {
    if (!isNumber(num) || num < 0 || num >= arr.length) {
        return false;
    }
    return true;
}
