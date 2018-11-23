const Parent = require('./Parent');
const checkForNumbr = require('./checkForNuber');
const checkForNumberNotZero = require('./checkForNumberNotZero');

class IntBuilder extends Parent {
    constructor(data = 0) {
        checkForNumbr(data, 'data param in IntBuilder constructor have to be a number');
        super(data);
    }

    static random(from = 0, to = from) {
        checkForNumbr(from, 'from param in IntBuilder random method have to be a number');
        checkForNumbr(to, 'to param in IntBuilder random method have to be a number');
        return Math.round(Math.random() * (to - from) + from);
    }

    plus(...args) {
        // check for numbers
        args.forEach(element => checkForNumbr(element, ' params in IntBuilder plas method have to be a number'));
        return super.plus(...args);
    }

    minus(...args) {
        args.forEach(element => checkForNumbr(element, ' params in IntBuilder minus method have to be a number'));
        if (args.length > 0) {
            this.cash += args.reduce((sum, current) => sum - current, 0);
        }
        return this;
    }

    multiply(num = 1) {
        checkForNumbr(num, 'num param in IntBuilder multiply method have to be a number');
        this.cash *= num;
        return this;
    }

    divide(num = 1) {
        checkForNumberNotZero(num, 'num param in IntBuilder divide method have to be a number != 0');
        this.cash = Math.trunc(this.cash / num);
        return this;
    }

    mod(num = 1) {
        checkForNumberNotZero(num, 'num param in IntBuilder mod method have to be a number != 0');
        this.cash = this.cash % num;
        return this;
    }
}

module.exports = IntBuilder;
