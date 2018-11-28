export default function isCorrect(num, arr) {
    if (typeof num !== 'number' || Number.isNaN(num) || num < 0 || num >= arr.length) {
        return false;
    }
    return true;
}
