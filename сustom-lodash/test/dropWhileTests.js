const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for DROPWHILE:', () => {
    const users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true },
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true },
    ];

    const obj = {
        1: { user: 'barney', active: false },
        2: { user: 'fred', active: false },
        3: { user: 'pebbles', active: true },
        4: { user: 'barney', active: true },
        5: { user: 'fred', active: false },
        6: { user: 'pebbles', active: true },
    };

    const map = new Map();
    map.set(1, { user: 'barney', age: 36, active: true });
    map.set(2, { user: 'fred', age: 40, active: false });
    describe('Simple tests:', () => {
        it('1. test from lodash docs', () => {
            const b = realLodash.dropWhile(users, o => !o.active);
            const a = _.dropWhile(users, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('2. test true every time', () => {
            const b = realLodash.dropWhile(users, () => true);
            const a = _.dropWhile(users, () => true);
            assert.deepEqual(a, b);
        });

        it('3. test false every time', () => {
            const b = realLodash.dropWhile(users, () => false);
            const a = _.dropWhile(users, () => false);
            assert.deepEqual(a, b);
        });

        it('4. custom test', () => {
            const b = realLodash.dropWhile(users, o => o.user !== 'pebbles');
            const a = _.dropWhile(users, o => o.user !== 'pebbles');
            assert.deepEqual(a, b);
        });

        it('5. array is string', () => {
            const b = realLodash.dropWhile('123456789', o => o < 5);
            const a = _.dropWhile('123456789', o => o < 5);
            assert.deepEqual(a, b);
        });
    });
    describe('Uncorrect perams:', () => {
        it('empty predicate', () => {
            const b = realLodash.dropWhile(users);
            const a = _.dropWhile(users);
            assert.deepEqual(a, b);
        });

        it('empty params', () => {
            const b = realLodash.dropWhile();
            const a = _.dropWhile();
            assert.deepEqual(a, b);
        });

        it('array is undefined', () => {
            const b = realLodash.dropWhile(undefined, o => !o.active);
            const a = _.dropWhile(undefined, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('array is object', () => {
            const b = realLodash.dropWhile(obj, o => !o.active);
            const a = _.dropWhile(obj, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('array is object', () => {
            const b = realLodash.dropWhile(obj, o => !o.active);
            const a = _.dropWhile(obj, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('array is NAN', () => {
            const b = realLodash.dropWhile(NaN, o => !o.active);
            const a = _.dropWhile(NaN, o => !o.active);
            assert.deepEqual(a, b);
        });

        it('predicate is not a function', () => {
            const b = realLodash.dropWhile(users, 'string');
            const a = _.dropWhile(users, 'string');
            assert.deepEqual(a, b);
        });
    });
});
