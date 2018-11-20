import MenuItem from './MenuItem.js';

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
        let num = menuElementNumber;
        if (typeof num === 'number' && !Number.isNaN(num)) {
            if (num < 0) {
                num = 0;
            } else if (num > this.items.length) {
                num %= this.items.length;
            }
        } else {
            num = 0;
        }
        this.items[this.activeItem].classList.remove('active');
        this.activeItem = menuElementNumber;
        this.items[this.activeItem].classList.toggle('active');
    }
}
