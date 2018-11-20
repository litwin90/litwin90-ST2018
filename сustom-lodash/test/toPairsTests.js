const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for toPairs', () => {
    describe('toPairs tests with correct params', () => {
        it('1. test from lodash docs', () => {
            function Foo() {
                this.a = 1;
                this.b = 2;
            }

            Foo.prototype.c = 3;

            const a = _.toPairs(new Foo());
            const b = realLodash.toPairs(new Foo());
            assert.deepEqual(a, b);
        });

        it('2. custom test', () => {
            const a = _.toPairs({ a: 1, b: 2, c: 3 });
            const b = realLodash.toPairs({ a: 1, b: 2, c: 3 });
            assert.deepEqual(a, b);
        });

        it('3. empty params', () => {
            const a = _.toPairs();
            const b = realLodash.toPairs();
            assert.deepEqual(a, b);
        });

        it('4. empty objeect', () => {
            const a = _.toPairs({});
            const b = realLodash.toPairs({});
            assert.deepEqual(a, b);
        });
    });
});
