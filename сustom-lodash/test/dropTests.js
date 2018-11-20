const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for DROP:', () => {
    describe('Simple tests:', () => {
        it('[1, 2, 3, 4, 5, 6], 1 => [2, 3, 4, 5, 6]', () => {
            const b = realLodash.drop([1, 2, 3, 4, 5, 6], 1);
            const a = _.drop([1, 2, 3, 4, 5, 6], 1);
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6], 0 => [1, 2, 3, 4, 5, 6]', () => {
            const b = realLodash.drop([1, 2, 3, 4, 5, 6], 0);
            const a = _.drop([1, 2, 3, 4, 5, 6], 0);
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6] => [2, 3, 4, 5, 6]', () => {
            const b = realLodash.drop([1, 2, 3, 4, 5, 6]);
            const a = _.drop([1, 2, 3, 4, 5, 6]);
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6], 100 => []', () => {
            const b = realLodash.drop([1, 2, 3, 4, 5, 6], 100);
            const a = _.drop([1, 2, 3, 4, 5, 6], 100);
            assert.deepEqual(a, b);
        });

        it('string1', () => {
            const b = realLodash.drop('12345', 1);
            const a = _.drop('12345', 1);
            assert.deepEqual(a, b);
        });

        it('string2', () => {
            const b = realLodash.drop('12345', 10);
            const a = _.drop('12345', 10);
            assert.deepEqual(a, b);
        });

        it('string3', () => {
            const b = realLodash.drop('12345', -10);
            const a = _.drop('12345', -10);
            assert.deepEqual(a, b);
        });
    });
    describe('Uncorrect params:', () => {
        it('an empty params', () => {
            const b = realLodash.drop();
            const a = _.drop();
            assert.deepEqual(a, b);
        });

        it('undefined', () => {
            const b = realLodash.drop(undefined);
            const a = _.drop(undefined);
            assert.deepEqual(a, b);
        });

        it('null', () => {
            const b = realLodash.drop(null);
            const a = _.drop(null);
            assert.deepEqual(a, b);
        });

        it('NaN', () => {
            const b = realLodash.drop(NaN);
            const a = _.drop(NaN);
            assert.deepEqual(a, b);
        });

        it('{}', () => {
            const b = realLodash.drop({});
            const a = _.drop({});
            assert.deepEqual(a, b);
        });

        it('() => {}', () => {
            const b = realLodash.drop(() => {});
            const a = _.drop(() => {});
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6], -10 => [1, 2, 3, 4, 5, 6]', () => {
            const b = realLodash.drop([1, 2, 3, 4, 5, 6], -10);
            const a = _.drop([1, 2, 3, 4, 5, 6], -10);
            assert.deepEqual(a, b);
        });
    });
});
