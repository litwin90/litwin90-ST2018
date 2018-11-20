const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for find:', () => {
    const users = [
        { user: 'barney', age: 36, active: true },
        { user: 'fred', age: 40, active: false },
        { user: 'fraddy', age: 1, active: false },
    ];

    const map = new Map();
    map.set(1, { user: 'barney', age: 36, active: true });
    map.set(2, { user: 'fred', age: 40, active: false });
    describe('Simple tests:', () => {
        it('1. test from lodash docs', () => {
            const b = realLodash.find(users, o => o.age < 40);
            const a = _.find(users, o => o.age < 40);
            assert.deepEqual(a, b);
        });

        it('2. test with array of objects', () => {
            const b = realLodash.find(users, o => o.active);
            const a = _.find(users, o => o.active);
            assert.deepEqual(a, b);
        });

        it('3. test with array of objects', () => {
            const b = realLodash.find(users, o => o.age > 36);
            const a = _.find(users, o => o.age > 36);
            assert.deepEqual(a, b);
        });

        it('4. test with strings', () => {
            const b = realLodash.find('123456789', o => o > 5);
            const a = _.find('123456789', o => o > 5);
            assert.deepEqual(a, b);
        });

        it('5. test with empty predicate', () => {
            const b = realLodash.find(users);
            const a = _.find(users);
            assert.deepEqual(a, b);
        });

        it('7. test with not itarable collection', () => {
            const b = realLodash.find({ active: 'true' }, o => !o.active);
            const a = _.find({ active: 'true' }, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('8. test with empty params', () => {
            const b = realLodash.find();
            const a = _.find();
            assert.deepEqual(a, b);
        });

        it('9. test with array of objects', () => {
            const b = realLodash.find(users, o => o.age > 36, 1);
            const a = _.find(users, o => o.age > 36, 1);
            assert.deepEqual(a, b);
        });

        it('10. test with array of objects', () => {
            const b = realLodash.find(users, o => o.age > 36, 10);
            const a = _.find(users, o => o.age > 36, 10);
            assert.deepEqual(a, b);
        });
    });
    describe('Tests with uncorrect params:', () => {
        it('collection is null', () => {
            const b = realLodash.find(null, o => !o.active);
            const a = _.find(null, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('collection is undefined', () => {
            const b = realLodash.find(undefined, o => !o.active);
            const a = _.find(undefined, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('collection is NAN', () => {
            const b = realLodash.find(NaN, o => !o.active);
            const a = _.find(NaN, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('predicate is not a function', () => {
            const b = realLodash.find(users, 'string');
            const a = _.find(users, 'string');
            assert.deepEqual(a, b);
        });

        it('from is NaN', () => {
            const b = realLodash.find(users, o => o.age > 36, NaN);
            const a = _.find(users, o => o.age > 36, NaN);
            assert.deepEqual(a, b);
        });

        it('from is null', () => {
            const b = realLodash.find(users, o => o.age > 36, null);
            const a = _.find(users, o => o.age > 36, null);
            assert.deepEqual(a, b);
        });

        it('from is false', () => {
            const b = realLodash.find(users, o => o.age > 36, false);
            const a = _.find(users, o => o.age > 36, false);
            assert.deepEqual(a, b);
        });

        it('from is []', () => {
            const b = realLodash.find(users, o => o.age > 36, [10]);
            const a = _.find(users, o => o.age > 36, [10]);
            assert.deepEqual(a, b);
        });

        it('from is () => {}', () => {
            const b = realLodash.find(users, o => o.age > 36, () => {});
            const a = _.find(users, o => o.age > 36, () => {});
            assert.deepEqual(a, b);
        });
    });
});
