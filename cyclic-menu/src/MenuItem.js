export default class MenuItem {
    constructor(text) {
        this.item = document.createElement('a');
        this.item.innerText = text;
        this.item.href = '#';
    }

    get() {
        return this.item;
    }

    valueOf() {
        return this.get();
    }
}
