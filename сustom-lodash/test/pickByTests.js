const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for pickBy', () => {
    describe('pickBy tests with correct params', () => {
        it('1. test from lodash docs', () => {
            const object = { a: 1, b: '2', c: 3 };

            const a = _.pickBy(object, realLodash.isNumber);
            const b = realLodash.pickBy(object, realLodash.isNumber);
            assert.deepEqual(a, b);
        });

        it('2. custom test', () => {
            const object = { a: 1, b: '2', c: 3 };

            const b = realLodash.pickBy(object);
            const a = _.pickBy(object);
            assert.deepEqual(a, b);
        });

        it('3. empty params', () => {
            const b = realLodash.pickBy();
            const a = _.pickBy();
            assert.deepEqual(a, b);
        });

        it('4. test with array', () => {
            const object = [1, 2, '3', 4, '5'];

            const a = _.pickBy(object, realLodash.isNumber);
            const b = realLodash.pickBy(object, realLodash.isNumber);
            assert.deepEqual(a, b);
        });

        it('5. test with string', () => {
            const object = '123456789';

            const a = _.pickBy(object, element => element > 5);
            const b = realLodash.pickBy(object, element => element > 5);
            assert.deepEqual(a, b);
        });
    });
    describe('pickBy tests with UNcorrect params', () => {
        it('1. test with undefined', () => {
            const object = undefined;

            const a = _.pickBy(object, realLodash.isNumber);
            const b = realLodash.pickBy(object, realLodash.isNumber);
            assert.deepEqual(a, b);
        });

        it('2. test with null', () => {
            const object = null;

            const a = _.pickBy(object, realLodash.isNumber);
            const b = realLodash.pickBy(object, realLodash.isNumber);
            assert.deepEqual(a, b);
        });

        it('3. test with NaN', () => {
            const object = NaN;

            const a = _.pickBy(object, realLodash.isNumber);
            const b = realLodash.pickBy(object, realLodash.isNumber);
            assert.deepEqual(a, b);
        });

        it('4. pridicate is null', () => {
            const object = [1, 2, '3', 4, '5'];
            const predicate = null;

            const a = _.pickBy(object, predicate);
            const b = realLodash.pickBy(object, predicate);
            assert.deepEqual(a, b);
        });
    });
});
