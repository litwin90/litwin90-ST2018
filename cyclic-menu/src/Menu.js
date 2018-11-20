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
        const num = createCorrectNumber(menuElementNumber, this.items);
        this.items[num].remove();
        this.items.splice(num, 1);
        this.setActiveClassTo(num);
    }

    removeItems() {
        this.items.forEach((element) => { element.remove(); });
        this.items = [];
    }
}
