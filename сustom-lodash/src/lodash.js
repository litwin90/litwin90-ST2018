const chunkFn = require('./chunk');
const compactFn = require('./compact');
const dropFn = require('./drop');
const dropWhileFn = require('./dropWhile');
const filterFn = require('./filter');
const takeFn = require('./take');
const findFn = require('./find');
const includesFn = require('./includes');
const mapFn = require('./map');
const zipFn = require('./zip');
const toPairsFn = require('./toPairs');
const pickByFn = require('./pickBy');
const pickFn = require('./pick');
const omitFn = require('./omit');
const omitByFn = require('./omitBy');
const mergeFn = require('./merge');

module.exports = {
    chunk: chunkFn,
    compact: compactFn,
    drop: dropFn,
    dropWhile: dropWhileFn,
    take: takeFn,
    filter: filterFn,
    find: findFn,
    includes: includesFn,
    map: mapFn,
    zip: zipFn,
    toPairs: toPairsFn,
    pickBy: pickByFn,
    pick: pickFn,
    omit: omitFn,
    omitBy: omitByFn,
    merge: mergeFn,
};
