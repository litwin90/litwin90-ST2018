const Parent = require('./Parent');
const checkForNumbr = require('./checkForNuber');
const checkForNumberNotZero = require('./checkForNumberNotZero');

function StringBuilder(str = '') {
    Parent.apply(this, arguments);
}
StringBuilder.prototype = Object.create(Parent.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function trimString(num) {
    var innerNum = num || 0;
    checkForNumbr(innerNum, 'num param in StringBuilder minus method have to be a number');
    this.cash = this.cash.slice(0, -innerNum);
    return this;
};
StringBuilder.prototype.multiply = function multiplyString(num = 1) {
    checkForNumbr(num, 'num param in StringBuilder multiply method have to be a number');
    if (num > 0) {
        var repeatedString = this.cash;
        var i;
        for (i = 1; i < num; i++) {
            this.cash += repeatedString;
        }
    } else {
        throw new Error('Please, enter correct parameter to multiply function');
    }

    return this;
};
StringBuilder.prototype.divide = function divideString(n = 1) {
    checkForNumberNotZero(n, 'n param in StringBuilder divude method have to be a number != 0');
    var k = Math.floor(this.cash.length / n);
    this.cash = this.cash.substr(0, k);

    return this;
};

StringBuilder.prototype.remove = function removeSubstring(substr = '') {
    if (typeof (substr) === 'string') {
        var index = this.cash.indexOf(substr);
        if (index !== -1) {
            this.cash = this.cash.slice(0, index) + this.cash.slice(index + substr.length);
        }
    } else {
        throw new Error('uncorrect params in remove function');
    }
    return this;
};

StringBuilder.prototype.sub = function removeSubstring(from = 0, n = this.cash.length) {
    checkForNumbr(from, 'from param in StringBuilder sub method have to be a number');
    checkForNumbr(n, 'n param in StringBuilder sub method have to be a number');
    this.cash = this.cash.substr(from, n);
    return this;
};

module.exports = StringBuilder;
