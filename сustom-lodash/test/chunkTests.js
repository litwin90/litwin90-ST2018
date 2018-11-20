const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for CHUNK', () => {
    describe('chunk tests with uncorrect params', () => {
        it('empty params', () => {
            const a = _.chunk();
            const b = realLodash.chunk();
            assert.deepEqual(a, b);
        });

        it('array is undefined', () => {
            const a = _.chunk(undefined);
            const b = realLodash.chunk(undefined);
            assert.deepEqual(a, b);
        });

        it('array is NaN', () => {
            const a = _.chunk(NaN);
            const b = realLodash.chunk(NaN);
            assert.deepEqual(a, b);
        });

        it('array is null', () => {
            const a = _.chunk(null);
            const b = realLodash.chunk(null);
            assert.deepEqual(a, b);
        });
        it('array is false', () => {
            const a = _.chunk(false);
            const b = realLodash.chunk(false);
            assert.deepEqual(a, b);
        });

        it('array is function', () => {
            const a = _.chunk(() => {});
            const b = realLodash.chunk(() => {});
            assert.deepEqual(a, b);
        });

        it('array is infinity', () => {
            const a = _.chunk(Infinity);
            const b = realLodash.chunk(Infinity);
            assert.deepEqual(a, b);
        });

        it('size is null', () => {
            const a = _.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], null);
            const b = realLodash.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], null);
            assert.deepEqual(a, b);
        });

        it('size is undefined', () => {
            const a = _.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], undefined);
            const b = realLodash.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], undefined);
            assert.deepEqual(a, b);
        });

        it('size is NaN', () => {
            const a = _.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], NaN);
            const b = realLodash.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], NaN);
            assert.deepEqual(a, b);
        });

        it('size is infinity', () => {
            const a = _.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], Infinity);
            const b = realLodash.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], Infinity);
            assert.deepEqual(a, b);
        });

        it('size is string', () => {
            const a = _.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 'aaaa');
            const b = realLodash.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 'aaaa');
            assert.deepEqual(a, b);
        });

        it('size === 0', () => {
            assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], 0), realLodash.chunk(['a', 'b', 'c', 'd'], 0));
        });

        it('size < 0', () => {
            assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], -10), realLodash.chunk(['a', 'b', 'c', 'd'], -10));
        });

        it('{}', () => {
            const a = _.chunk({});
            const b = realLodash.chunk({});
            assert.deepEqual(a, b);
        });

        it('{a:1}', () => {
            const a = _.chunk({ a: 1 });
            const b = realLodash.chunk({ a: 1 });
            assert.deepEqual(a, b);
        });
    });

    describe('chunk tests with correct params', () => {
        it('empty array', () => {
            assert.deepEqual(_.chunk([]), realLodash.chunk([]));
        });

        it('["a", "b", "c", "d"], 2', () => {
            assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], 2), realLodash.chunk(['a', 'b', 'c', 'd'], 2));
        });

        it('["a", "b", "c", "d"], 3', () => {
            assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], 3), realLodash.chunk(['a', 'b', 'c', 'd'], 3));
        });

        it('["a", "b", "c", "d"], 4', () => {
            assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], 4), realLodash.chunk(['a', 'b', 'c', 'd'], 4));
        });

        it('["a", "b", "c", "d"], 5', () => {
            assert.deepEqual(_.chunk(['a', 'b', 'c', 'd'], 5), realLodash.chunk(['a', 'b', 'c', 'd'], 5));
        });

        it('without size param', () => {
            assert.deepEqual(_.chunk(['a', 'b', 'c', 'd']), realLodash.chunk(['a', 'b', 'c', 'd']));
        });
    });

    describe('chunk tests with strings', () => {
        it('string', () => {
            const a = _.chunk('string');
            const b = realLodash.chunk('string');
            assert.deepEqual(a, b);
        });

        it('"abcd", 2', () => {
            assert.deepEqual(_.chunk('string', 2), realLodash.chunk('string', 2));
        });

        it('"abcd", 4', () => {
            assert.deepEqual(_.chunk('abcd', 4), realLodash.chunk('abcd', 4));
        });

        it('"abcd", 5', () => {
            assert.deepEqual(_.chunk('abcd', 5), realLodash.chunk('abcd', 5));
        });
    });
});
