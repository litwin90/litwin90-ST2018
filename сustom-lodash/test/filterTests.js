const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for FILTER:', () => {
    const users = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
    ];

    const map = new Map();
    map.set(1, { user: 'barney', age: 36, active: true });
    map.set(2, { user: 'fred', age: 40, active: false });
    describe('Simple tests:', () => {
        it('1. test from lodash docs', () => {
            const b = realLodash.filter(users, o => !o.active);
            const a = _.filter(users, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('2. test with array of objects', () => {
            const b = realLodash.filter(users, o => o.active);
            const a = _.filter(users, o => o.active);
            assert.deepEqual(a, b);
        });

        it('3. test with array of objects', () => {
            const b = realLodash.filter(users, o => o.age > 36);
            const a = _.filter(users, o => o.age > 36);
            assert.deepEqual(a, b);
        });

        it('4. test with strings', () => {
            const b = realLodash.filter('123456789', o => o > 5);
            const a = _.filter('123456789', o => o > 5);
            assert.deepEqual(a, b);
        });

        it('5. test with empty predicate', () => {
            const b = realLodash.filter(users);
            const a = _.filter(users);
            assert.deepEqual(a, b);
        });

        it('6. test with map collection', () => {
            const b = realLodash.filter(map);
            const a = _.filter(map);
            assert.deepEqual(a, b);
        });

        it('7. test with not itarable collection', () => {
            const b = realLodash.filter({ active: 'true' }, o => !o.active);
            const a = _.filter({ active: 'true' }, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('8. test with empty params', () => {
            const b = realLodash.filter();
            const a = _.filter();
            assert.deepEqual(a, b);
        });
    });
    describe('Tests with uncorrect params:', () => {
        it('collection is null', () => {
            const b = realLodash.filter(null, o => !o.active);
            const a = _.filter(null, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('collection is undefined', () => {
            const b = realLodash.filter(undefined, o => !o.active);
            const a = _.filter(undefined, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('collection is NAN', () => {
            const b = realLodash.filter(NaN, o => !o.active);
            const a = _.filter(NaN, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('predicate is not a function', () => {
            const b = realLodash.filter(users, 'string');
            const a = _.filter(users, 'string');
            assert.deepEqual(a, b);
        });
    });
});
