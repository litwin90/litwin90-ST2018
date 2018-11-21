import MenuFactory from './MenuFactory.js';
import isCorrect from './isCorrect.js';

export default class Menu {
    constructor(id = 'menu', buttons = []) {
        this.menuContainer = document.createElement('nav');
        this.menuContainer.id = 'menu';
        this.itemFactory = MenuFactory;
        this.buttons = buttons.map(element => this.itemFactory.createButton(element));
        this.activeButton = 0;
        this.buttons[this.activeButton].classList.toggle('active');
        this.buttons.forEach((element) => {
            this.menuContainer.appendChild(element);
        });
    }

    get() {
        return this.menuContainer;
    }

    render(parent = document.body) {
        parent.appendChild(this.menuContainer);
    }

    setActiveClassTo(num = 0) {
        if (isCorrect(num, this.buttons)) {
            this.buttons[this.activeButton].classList.remove('active');
            this.activeButton = num;
            this.buttons[this.activeButton].classList.toggle('active');
        }
    }

    removeButton(num = 0) {
        if (isCorrect(num, this.buttons)) {
            this.buttons[num].remove();
            this.buttons.splice(num, 1);
            if (this.activeButton === this.buttons.length) {
                this.setActiveClassTo(this.buttons.length - 1);
            }
        }
    }

    removebuttons() {
        this.buttons.forEach((element) => { element.remove(); });
        this.buttons = [];
    }

    addButtonToPosition(position = 0, text = 'New Item', href = '#') {
        if (isCorrect(position, this.buttons) || position === this.buttons.length) {
            this.buttons.splice(position, 0, this.itemFactory.createButton(text, href));
            this.menuContainer.insertBefore(this.buttons[position],
                this.buttons[position + 1]);
        }
    }

    addButton(text = 'New Item', href = '#') {
        this.addButtonToPosition(this.buttons.length, text, href);
    }

    setButtonText(num, text = 'New text') {
        if (isCorrect(num, this.buttons)) {
            this.buttons[num].text = text;
        }
    }

    setButtonHref(num, href = '#') {
        if (isCorrect(num, this.buttons)) {
            this.buttons[num].href = href;
        }
    }
}
