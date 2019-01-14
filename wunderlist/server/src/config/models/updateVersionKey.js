/* eslint-disable no-underscore-dangle */
function updateVersionKey(next) {
    // update __v key:
    const update = this.getUpdate();
    if (update.__v != null) {
        delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
        if (update[key] != null && update[key].__v != null) {
            delete update[key].__v;
            if (Object.keys(update[key]).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
    next();
}

module.exports = updateVersionKey;
