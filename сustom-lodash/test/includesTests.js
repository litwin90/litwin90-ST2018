const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for includes:', () => {
    describe('Simple tests:', () => {
        it('1. test from lodash docs', () => {
            const b = realLodash.includes([1, 2, 3], 1);
            const a = _.includes([1, 2, 3], 1);
            assert.deepEqual(a, b);
        });

        it('2. test from lodash docs', () => {
            const b = realLodash.includes([1, 2, 3], 1, 2);
            const a = _.includes([1, 2, 3], 1, 2);
            assert.deepEqual(a, b);
        });

        it('3. test from lodash docs', () => {
            const b = realLodash.includes({ a: 1, b: 2 }, 1);
            const a = _.includes({ a: 1, b: 2 }, 1);
            assert.deepEqual(a, b);
        });

        it('4. [1, 2, 3], 1, 100 ', () => {
            const b = realLodash.includes([1, 2, 3], 1, 100);
            const a = _.includes([1, 2, 3], 1, 100);
            assert.deepEqual(a, b);
        });

        it('5. test with empty params', () => {
            const b = realLodash.includes();
            const a = _.includes();
            assert.deepEqual(a, b);
        });

        it('6. test with no search value', () => {
            const b = realLodash.includes([1, 2, 3]);
            const a = _.includes([1, 2, 3]);
            assert.deepEqual(a, b);
        });

        it('9. test with array of objects', () => {
            const obj = {};
            const b = realLodash.includes([{}, obj, {}], obj);
            const a = _.includes([{}, obj, {}], obj);
            assert.deepEqual(a, b);
        });

        it('10. test with array of objects', () => {
            const obj = [undefined];
            const b = realLodash.includes(obj, undefined);
            const a = _.includes(obj, undefined);
            assert.deepEqual(a, b);
        });
        it('11. test from Max', () => {
            const obj = {};
            const b = realLodash.includes([{}, {}, {}], obj);
            const a = _.includes([{}, {}, {}], obj);
            assert.deepEqual(a, b);
        });
    });
    describe('Tests with uncorrect params:', () => {
        it('collection is null', () => {
            const b = realLodash.includes(null);
            const a = _.includes(null);
            assert.deepEqual(a, b);
        });

        it('collection is null', () => {
            const b = realLodash.includes(null, 1);
            const a = _.includes(null, 1);
            assert.deepEqual(a, b);
        });

        it('collection is undefined', () => {
            const b = realLodash.includes(undefined);
            const a = _.includes(undefined);
            assert.deepEqual(a, b);
        });

        it('collection is undefined', () => {
            const b = realLodash.includes(undefined, 1);
            const a = _.includes(undefined, 1);
            assert.deepEqual(a, b);
        });

        it('collection is NaN', () => {
            const b = realLodash.includes(NaN);
            const a = _.includes(NaN);
            assert.deepEqual(a, b);
        });

        it('collection is NaN', () => {
            const b = realLodash.includes(NaN, 1);
            const a = _.includes(NaN, 1);
            assert.deepEqual(a, b);
        });


        it('value is null', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], null);
            const a = _.includes([1, 2, 3, 4, 5], null);
            assert.deepEqual(a, b);
        });

        it('value is undefined', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], undefined);
            const a = _.includes([1, 2, 3, 4, 5], undefined);
            assert.deepEqual(a, b);
        });

        it('value is NaN', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], NaN);
            const a = _.includes([1, 2, 3, 4, 5], NaN);
            assert.deepEqual(a, b);
        });

        it('value is []', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], []);
            const a = _.includes([1, 2, 3, 4, 5], []);
            assert.deepEqual(a, b);
        });

        it('value is {}', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], {});
            const a = _.includes([1, 2, 3, 4, 5], {});
            assert.deepEqual(a, b);
        });


        it('from is null', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], 1, null);
            const a = _.includes([1, 2, 3, 4, 5], 1, null);
            assert.deepEqual(a, b);
        });

        it('from is undefined', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], 1, undefined);
            const a = _.includes([1, 2, 3, 4, 5], 1, undefined);
            assert.deepEqual(a, b);
        });

        it('from is NaN', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], 1, NaN);
            const a = _.includes([1, 2, 3, 4, 5], 1, NaN);
            assert.deepEqual(a, b);
        });

        it('from is []', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], 1, []);
            const a = _.includes([1, 2, 3, 4, 5], 1, []);
            assert.deepEqual(a, b);
        });

        it('from is {}', () => {
            const b = realLodash.includes([1, 2, 3, 4, 5], 1, {});
            const a = _.includes([1, 2, 3, 4, 5], 1, {});
            assert.deepEqual(a, b);
        });
    });
});
