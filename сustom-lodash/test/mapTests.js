const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for map:', () => {
    const users = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
    ];

    const map = new Map();
    map.set(1, { user: 'barney', age: 36, active: true });
    map.set(2, { user: 'fred', age: 40, active: false });
    describe('Simple tests:', () => {
        it('1. custon test', () => {
            const b = realLodash.map(users, o => !o.active);
            const a = _.map(users, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('2. custon test', () => {
            const b = realLodash.map(users, o => o.active);
            const a = _.map(users, o => o.active);
            assert.deepEqual(a, b);
        });

        it('3. custon test', () => {
            const b = realLodash.map(users, o => o.age > 36);
            const a = _.map(users, o => o.age > 36);
            assert.deepEqual(a, b);
        });

        it('4. test with strings', () => {
            const b = realLodash.map('123456789', o => o > 5);
            const a = _.map('123456789', o => o > 5);
            assert.deepEqual(a, b);
        });

        it('5. test with strings', () => {
            const b = realLodash.map('123456789', (Letter, index, collection) => `Letter # ${index + 1} in word "${collection}" is "${Letter}"`);
            const a = _.map('123456789', (Letter, index, collection) => `Letter # ${index + 1} in word "${collection}" is "${Letter}"`);
            assert.deepEqual(a, b);
        });

        it('6. test with empty predicate', () => {
            const b = realLodash.map(users);
            const a = _.map(users);
            assert.deepEqual(a, b);
        });

        it('8. test with not itarable collection', () => {
            const b = realLodash.map({ active: 'true' }, o => !o.active);
            const a = _.map({ active: 'true' }, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('9. test with empty params', () => {
            const b = realLodash.map();
            const a = _.map();
            assert.deepEqual(a, b);
        });

        it('10. predicate is a correct string', () => {
            const b = realLodash.map(users, 'age');
            const a = _.map(users, 'age');
            assert.deepEqual(a, b);
        });

        it('11. custom test', () => {
            const b = realLodash.map([1, 2, 3, 4, 5, 6, 7],
                (element, index, array) => element + index + array.length);
            const a = _.map([1, 2, 3, 4, 5, 6, 7],
                (element, index, array) => element + index + array.length);
            assert.deepEqual(a, b);
        });

        it('12. custom test', () => {
            const b = realLodash.map({ a: 'a', b: 'b', c: 'c' }, element => element);
            const a = _.map({ a: 'a', b: 'b', c: 'c' }, element => element);
            assert.deepEqual(a, b);
        });

        it('13. custom test', () => {
            const b = realLodash.map({ keyA: 'a', keyB: 'b', keyC: 'c' }, (element, key, obj) => `Key :${key}; value: ${element} in obj${obj}`);
            const a = _.map({ keyA: 'a', keyB: 'b', keyC: 'c' }, (element, key, obj) => `Key :${key}; value: ${element} in obj${obj}`);
            assert.deepEqual(a, b);
        });
    });
    describe('Tests with uncorrect params:', () => {
        it('collection is null', () => {
            const b = realLodash.map(null, o => !o.active);
            const a = _.map(null, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('collection is undefined', () => {
            const b = realLodash.map(undefined, o => !o.active);
            const a = _.map(undefined, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('collection is NAN', () => {
            const b = realLodash.map(NaN, o => !o.active);
            const a = _.map(NaN, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('predicate is a uncorrect string', () => {
            const b = realLodash.map(users, 'string');
            const a = _.map(users, 'string');
            assert.deepEqual(a, b);
        });
    });
});
