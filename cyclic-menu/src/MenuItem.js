export default class MenuItem {
    constructor(text) {
        this.item = document.createElement('a');
        this.item.innerText = text;
        this.item.href = '#';
        return this.item;
    }
}
