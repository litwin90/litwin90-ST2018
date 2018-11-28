export default class Button {
    constructor(text = 'New Button', href = '#') {
        this.item = document.createElement('a');
        this.item.innerText = text;
        this.item.href = href;
    }
}
