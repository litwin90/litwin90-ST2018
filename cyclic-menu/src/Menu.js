import MenuItem from './MenuItem.js';
import createCorrectNumber from './createCorrectNumber.js';

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

    setActiveClassTo(menuElementNumber = 0) {
        const num = createCorrectNumber(menuElementNumber, this.items);
        this.items[this.activeItem].classList.remove('active');
        this.activeItem = num;
        this.items[this.activeItem].classList.toggle('active');
    }

    removeItem(menuElementNumber = 0) {
        let num = createCorrectNumber(menuElementNumber, this.items);
        this.items[num].remove();
        this.items.splice(num, 1);
        num = createCorrectNumber(menuElementNumber, this.items);
        this.setActiveClassTo(num);
    }

    removeItems() {
        this.items.forEach((element) => { element.remove(); });
        this.items = [];
    }

    addItemToPosition(position = 0, text = 'New Item', href = '#') {
        const correctedPosition = createCorrectNumber(position, this.items);
        this.items.splice(correctedPosition, 0, new MenuItem(text, href));
        this.menuContainer.insertBefore(this.items[correctedPosition],
            this.items[correctedPosition + 1]);
    }

    addItem(text = 'New Item', href = '#') {
        this.addItemToPosition(this.items.length, text, href);
    }
}
