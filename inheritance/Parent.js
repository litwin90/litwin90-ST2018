function Parent(data) {
    this.cash = data;
}
Parent.prototype.plus = function plus() {
    if (arguments.length > 0) {
        this.cash += [].reduce.call(arguments, (sum, current) => sum + current);
    }
    return this;
};
Parent.prototype.get = function get() {
    return this.cash;
};
Parent.prototype.minus = function get() {
    return this;
};
Parent.prototype.multiply = function get() {
    return this;
};
Parent.prototype.divide = function get() {
    return this;
};

module.exports = Parent;
