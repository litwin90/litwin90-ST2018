import MenuItem from './MenuItem.js';
import isCorrect from './isCorrect.js';

export default class Menu {
    constructor(array) {
        this.menuContainer = document.createElement('nav');
        this.menuContainer.id = 'menu';
        this.items = array.map(element => new MenuItem(element));
        this.activeItem = 0;
        this.items[this.activeItem].classList.toggle('active');
        this.items.forEach((element) => {
            this.menuContainer.appendChild(element);
        });
    }

    get() {
        return this.menuContainer;
    }

    append(parent = document.querySelector('body')) {
        parent.appendChild(this.menuContainer);
    }

    setActiveClassTo(num = 0) {
        if (isCorrect(num, this.items)) {
            this.items[this.activeItem].classList.remove('active');
            this.activeItem = num;
            this.items[this.activeItem].classList.toggle('active');
        }
    }

    removeItem(num = 0) {
        if (isCorrect(num, this.items)) {
            this.items[num].remove();
            this.items.splice(num, 1);
            this.setActiveClassTo(num - 1);
        }
    }

    removeItems() {
        this.items.forEach((element) => { element.remove(); });
        this.items = [];
    }

    addItemToPosition(position = 0, text = 'New Item', href = '#') {
        if (isCorrect(position, this.items) || position === this.items.length) {
            this.items.splice(position, 0, new MenuItem(text, href));
            this.menuContainer.insertBefore(this.items[position],
                this.items[position + 1]);
        }
    }

    addItem(text = 'New Item', href = '#') {
        this.addItemToPosition(this.items.length, text, href);
    }

    setItemText(num, text = 'New text') {
        if (isCorrect(num, this.items)) {
            this.items[num].text = text;
        }
    }
}
