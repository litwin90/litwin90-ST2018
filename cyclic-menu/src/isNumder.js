export default function isNumber(val) {
    if (typeof val === 'number' && !Number.isNaN(val)) {
        return true;
    }
    return false;
}
