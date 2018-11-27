/* eslint-disable no-restricted-syntax */
function createAutocomplete(array) {
    const query = new Map();
    let queryKeys = query.keys();
    return function autocomplite(s) {
        if (!s) {
            return [];
        }
        const string = s.toLowerCase();
        if (query.has(string)) {
            return query.get(string);
        }
        const reg = new RegExp(`^${string}`, 'i');
        const result = [];
        let longestQuery = '';
        for (const key of queryKeys) {
            if (key.length > longestQuery.length && string.includes(key)) {
                longestQuery = key;
            }
        }
        const collection = query.get(longestQuery) || array;
        const len = collection.length;
        for (let i = 0; i < len; i += 1) {
            if (reg.test(collection[i])) {
                result.push(collection[i]);
            }
        }
        query.set(string, result);
        queryKeys = query.keys();
        return result;
    };
}

module.exports.createAutoComplete = createAutocomplete;
