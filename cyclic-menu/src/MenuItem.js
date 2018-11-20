export default class MenuItem {
    constructor(text, href = '#') {
        this.item = document.createElement('a');
        this.item.innerText = text;
        this.item.href = href;
        return this.item;
    }
}
