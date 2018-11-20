const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for zip', () => {
    describe('zip tests with correct params', () => {
        it('1. test from lodash docs', () => {
            const a = _.zip(['a', 'b'], [1, 2], [true, false]);
            const b = realLodash.zip(['a', 'b'], [1, 2], [true, false]);
            assert.deepEqual(a, b);
        });

        it('2. custom test', () => {
            const a = _.zip(['a', 'b', 1], [1, 2, 3, 4, 5, 6, 7], [true, false], [{}]);
            const b = realLodash.zip(['a', 'b', 1], [1, 2, 3, 4, 5, 6, 7], [true, false], [{}]);
            assert.deepEqual(a, b);
        });

        it('3. test with empty args', () => {
            const a = _.zip();
            const b = realLodash.zip();
            assert.deepEqual(a, b);
        });
    });
    describe('zip tests with uncorrect params', () => {
        it('1. test with object', () => {
            const a = _.zip({ 1: [1, 2, 3], 2: [1] });
            const b = realLodash.zip({ 1: [1, 2, 3], 2: [1] });
            assert.deepEqual(a, b);
        });

        it('2. test with undefined', () => {
            const a = _.zip(undefined);
            const b = realLodash.zip(undefined);
            assert.deepEqual(a, b);
        });

        it('3. test with strings', () => {
            const a = _.zip('123456789', '123456789', '123456789');
            const b = realLodash.zip('123456789', '123456789', '123456789');
            assert.deepEqual(a, b);
        });

        it('4. test with strings', () => {
            const a = _.zip('123456789');
            const b = realLodash.zip('123456789' );
            assert.deepEqual(a, b);
        });
    });
});
