const assert = require('assert');

Object.freeze(assert);
const realLodash = require('lodash');
const _ = require('../index');

describe('TESTS for COMPACT:', () => {
    describe('Simple tests:', () => {
        it('[true, false, true, false] => [true, true]', () => {
            const b = realLodash.compact([true, false, true, false]);
            const a = _.compact([true, false, true, false]);
            assert.deepEqual(a, b);
        });

        it('[null, null, 1, 1] => [1, 1]', () => {
            const b = realLodash.compact([null, null, 1, 1]);
            const a = _.compact([null, null, 1, 1]);
            assert.deepEqual(a, b);
        });

        it('[undefined, undefined, 1, 1] => [1, 1]', () => {
            const b = realLodash.compact([undefined, undefined, 1, 1]);
            const a = _.compact([undefined, undefined, 1, 1]);
            assert.deepEqual(a, b);
        });

        it('[NaN, NaN, 1, 1] => [1, 1]', () => {
            const b = realLodash.compact([NaN, NaN, 1, 1]);
            const a = _.compact([NaN, NaN, 1, 1]);
            assert.deepEqual(a, b);
        });

        it('[0, 0, 1, 1] => [1, 1]', () => {
            const b = realLodash.compact([0, 0, 1, 1]);
            const a = _.compact([0, 0, 1, 1]);
            assert.deepEqual(a, b);
        });

        it('["", "", "0", "0"] => ["0", "0"]', () => {
            const b = realLodash.compact(['', '', '0', '0']);
            const a = _.compact(['', '', '0', '0']);
            assert.deepEqual(a, b);
        });

        it('[true, false, null, undefined, NaN, {}, [], () => {}, 1, "0", "", "aaaa"] => [true, {}, [], () => {}, 1, "0", "aaaa"]', () => {
            const b = realLodash.compact([true, false, null, undefined, NaN, {}, [], () => {}, 1, '0', '', 'aaaa']);
            const a = _.compact([true, false, null, undefined, NaN, {}, [], () => {}, 1, '0', '', 'aaaa']);
            assert.deepEqual(a.toString(), b.toString());
        });

        it('string', () => {
            const b = realLodash.compact('string');
            const a = _.compact('string');
            assert.deepEqual(a, b);
        });
    });
    describe('Uncorrect params', () => {
        it('null', () => {
            const b = realLodash.compact(null);
            const a = _.compact(null);
            assert.deepEqual(a, b);
        });

        it('undefined', () => {
            const b = realLodash.compact(undefined);
            const a = _.compact(undefined);
            assert.deepEqual(a, b);
        });

        it('NAN', () => {
            const b = realLodash.compact(NaN);
            const a = _.compact(NaN);
            assert.deepEqual(a, b);
        });

        it('{}', () => {
            const b = realLodash.compact({});
            const a = _.compact({});
            assert.deepEqual(a, b);
        });

        it('()=>{}', () => {
            const b = realLodash.compact(() => {});
            const a = _.compact(() => {});
            assert.deepEqual(a, b);
        });

        it('true', () => {
            const b = realLodash.compact(true);
            const a = _.compact(true);
            assert.deepEqual(a, b);
        });
    });
});
