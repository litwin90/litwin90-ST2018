const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for take:', () => {
    describe('Simple tests:', () => {
        it('[1, 2, 3, 4, 5, 6], 1 => [1]', () => {
            const b = realLodash.take([1, 2, 3, 4, 5, 6], 1);
            const a = _.take([1, 2, 3, 4, 5, 6], 1);
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6], 0 => []', () => {
            const b = realLodash.take([1, 2, 3, 4, 5, 6], 0);
            const a = _.take([1, 2, 3, 4, 5, 6], 0);
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6] => [1]', () => {
            const b = realLodash.take([1, 2, 3, 4, 5, 6]);
            const a = _.take([1, 2, 3, 4, 5, 6]);
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6], 100 => [1, 2, 3, 4, 5, 6]', () => {
            const b = realLodash.take([1, 2, 3, 4, 5, 6], 100);
            const a = _.take([1, 2, 3, 4, 5, 6], 100);
            assert.deepEqual(a, b);
        });

        it('string1', () => {
            const b = realLodash.take('12345', 1);
            const a = _.take('12345', 1);
            assert.deepEqual(a, b);
        });

        it('string2', () => {
            const b = realLodash.take('12345', 10);
            const a = _.take('12345', 10);
            assert.deepEqual(a, b);
        });

        it('string3', () => {
            const b = realLodash.take('12345', -10);
            const a = _.take('12345', -10);
            assert.deepEqual(a, b);
        });
    });
    describe('Uncorrect params:', () => {
        it('an empty params', () => {
            const b = realLodash.take();
            const a = _.take();
            assert.deepEqual(a, b);
        });

        it('undefined', () => {
            const b = realLodash.take(undefined);
            const a = _.take(undefined);
            assert.deepEqual(a, b);
        });

        it('null', () => {
            const b = realLodash.take(null);
            const a = _.take(null);
            assert.deepEqual(a, b);
        });

        it('NaN', () => {
            const b = realLodash.take(NaN);
            const a = _.take(NaN);
            assert.deepEqual(a, b);
        });

        it('{}', () => {
            const b = realLodash.take({});
            const a = _.take({});
            assert.deepEqual(a, b);
        });

        it('() => {}', () => {
            const b = realLodash.take(() => {});
            const a = _.take(() => {});
            assert.deepEqual(a, b);
        });

        it('[1, 2, 3, 4, 5, 6], -10 => [1, 2, 3, 4, 5, 6]', () => {
            const b = realLodash.take([1, 2, 3, 4, 5, 6], -10);
            const a = _.take([1, 2, 3, 4, 5, 6], -10);
            assert.deepEqual(a, b);
        });
    });
});
