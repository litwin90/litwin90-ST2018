const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for omit', () => {
    describe('omit tests with correct params', () => {
        it('1. test from lodash docs', () => {
            const object = { a: 1, b: '2', c: 3 };

            const b = realLodash.omit(object, ['a', 'c']);
            const a = _.omit(object, ['a', 'c']);
            assert.deepEqual(a, b);
        });

        it('2. custom test', () => {
            const object = { a: 1, b: '2', c: 3 };

            const a = _.omit(object, ['a', 'b']);
            const b = realLodash.omit(object, ['a', 'b']);
            assert.deepEqual(a, b);
        });

        it('3. empty params', () => {
            const b = realLodash.omit();
            const a = _.omit();
            assert.deepEqual(a, b);
        });

        it('4. test with array', () => {
            const object = [1, 2, '3', 4, '5'];

            const b = realLodash.omit(object, [1, 3]);
            const a = _.omit(object, [1, 3]);
            assert.deepEqual(a, b);
        });

        it('5. test with string', () => {
            const object = '123456789';

            const a = _.omit(object, [1, 3]);
            const b = realLodash.omit(object, [1, 3]);
            assert.deepEqual(a, b);
        });
    });
    describe('omit tests with UNcorrect params', () => {
        it('1. test with undefined', () => {
            const object = undefined;

            const a = _.omit(object, [1, 3]);
            const b = realLodash.omit(object, [1, 3]);
            assert.deepEqual(a, b);
        });

        it('2. test with null', () => {
            const object = null;

            const a = _.omit(object, [1, 3]);
            const b = realLodash.omit(object, [1, 3]);
            assert.deepEqual(a, b);
        });

        it('3. test with NaN', () => {
            const object = NaN;

            const a = _.omit(object, [1, 3]);
            const b = realLodash.omit(object, [1, 3]);
            assert.deepEqual(a, b);
        });

        it('5. test with path - empty', () => {
            const object = { a: 1, b: '2', c: 3 };

            const a = _.omit(object, []);
            const b = realLodash.omit(object, []);
            assert.deepEqual(a, b);
        });

        it('6. test with path - object with length', () => {
            const object = { a: 1, b: '2', c: 3 };

            const a = _.omit(object, { length: 10 });
            const b = realLodash.omit(object, { length: 10 });
            assert.deepEqual(a, b);
        });
    });
});
