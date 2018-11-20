const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for merge', () => {
    describe('merge tests with correct params', () => {
        it('1. test from lodash docs', () => {
            const object = {
                a: [{ b: 2 }, { d: 4 }],
            };

            const other = {
                a: [{ c: 3 }, { e: 5 }],
            };

            const b = realLodash.merge(object, other);
            const a = _.merge(object, other);
            assert.deepEqual(a, b);
        });
        it('2. custom test', () => {
            const object = {
                a: [{ b: 2 }, { d: 4 }],
                b: 1,
            };

            const other = {
                a: [{ c: 3 }, { e: 5 }],
                b: [{ c: 3 }, { e: 5 }],
            };

            const b = realLodash.merge(object, other);
            const a = _.merge(object, other);
            assert.deepEqual(a, b);
        });
        it('3. custom test', () => {
            const object = {
                a: [{ b: 2 }, { d: 4 }],
                b: [{ c: 3 }, { e: 5 }],
            };

            const other = {
                a: [{ c: 3 }, { e: 5, d: new Map() }],
                b: 1,
            };

            const b = realLodash.merge(object, other);
            const a = _.merge(object, other);
            assert.deepEqual(a, b);
        });

        it('4. severol surces', () => {
            const object = {
                a: [{ b: 2 }, { d: 4 }],
                b: [{ c: 3 }, { e: 5 }],
            };

            const other1 = {
                a: [{ c: 3 }, { e: 5, d: new Map() }],
                b: 1,
            };

            const other2 = {
                a: [{ f: 3 }, { g: 5, d: new Map() }],
                b: 1,
                d: () => {},
            };

            const b = realLodash.merge(object, other1, other2);
            const a = _.merge(object, other1, other2);
            assert.deepEqual(a, b);
        });
    });
    describe('merge tests with Uncorrect params', () => {
        it('1. empty params', () => {
            const b = realLodash.merge();
            const a = _.merge();
            assert.deepEqual(a, b);
        });
        it('2. empty source', () => {
            const object = {
                a: [{ b: 2 }, { d: 4 }],
            };
            const b = realLodash.merge(object);
            const a = _.merge(object);
            assert.deepEqual(a, b);
        });
        it('3. object - null', () => {
            const object = null;
            const other = {
                a: [{ c: 3 }, { e: 5 }],
                b: [{ c: 3 }, { e: 5 }],
            };

            const b = realLodash.merge(object, other);
            const a = _.merge(object, other);
            assert.deepEqual(a, b);
        });
    });
});
