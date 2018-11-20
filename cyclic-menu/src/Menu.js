import MenuItem from './MenuItem.js';

export default class Menu {
    constructor(array) {
        this.menuContainer = document.createElement('nav');
        this.menuContainer.id = 'menu';
        this.items = array.map(element => (new MenuItem(element)).get());
        this.activeItem = 0;
        this.items[this.activeItem].classList.toggle('active');
        this.items.forEach((element) => {
            this.menuContainer.appendChild(element);
        });
    }
}
