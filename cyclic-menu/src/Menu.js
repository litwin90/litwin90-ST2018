/* eslint-disable import/extensions */
import Button from './Button.js';
import isCorrect from './isCorrect.js';

export default class Menu {
    // eslint-disable-next-line no-unused-vars
    constructor(id = 'menu', buttons = []) {
        this.menuContainer = document.createElement('nav');
        this.menuContainer.id = 'menu';
        this.buttons = buttons.map(element => this.createButton(element));
        // eslint-disable-next-line prefer-destructuring
        this.activeButton = this.buttons[0];
        this.activeButtonIndex = 0;
        this.activeButton.classList.toggle('active');
        this.buttons.forEach((element) => {
            this.menuContainer.appendChild(element);
        });
        this.onWindowLoadHandler = function handler(event, parent) {
            parent.appendChild(this.menuContainer);
        };
    }

    // eslint-disable-next-line class-methods-use-this
    createButton(text = 'New Button', href = '#') {
        return new Button(text, href);
    }

    // eslint-disable-next-line class-methods-use-this
    render(parent = document.querySelector('body')) {
        this.onWindowLoadHandler = this.onWindowLoadHandler.bind(this, null, parent);
        window.onload = this.onWindowLoadHandler;
    }

    setActiveClassTo(num = 0) {
        if (isCorrect(num, this.buttons)) {
            this.activeButton.classList.remove('active');
            this.activeButton = this.buttons[num];
            this.activeButton.classList.toggle('active');
            this.activeButtonIndex = this.buttons.indexOf(this.activeButton);
        }
    }

    removeButton(num = 0) {
        if (isCorrect(num, this.buttons)) {
            this.buttons[num].remove();
            this.buttons.splice(num, 1);
            this.setActiveClassTo(this.activeButton);
            if (this.buttons.indexOf(this.activeButton) === this.buttons.length) {
                this.setActiveClassTo(this.buttons.length - 1);
            }
        }
    }

    removeButtons() {
        this.buttons.forEach((element) => { element.remove(); });
        this.buttons = [];
    }

    addButtonToPosition(position = 0, text = 'New Item', href = '#') {
        if (isCorrect(position, this.buttons) || position === this.buttons.length) {
            this.buttons.splice(position, 0, this.createButton(text, href));
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
