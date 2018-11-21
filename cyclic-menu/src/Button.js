import MenuItem from './MenuItem.js';

export default class Button extends MenuItem {
    constructor(text = 'New Button', href = '#') {
        super();
        this.item = document.createElement('a');
        this.item.innerText = text;
        this.item.href = href;
        return this.item;
    }
}
