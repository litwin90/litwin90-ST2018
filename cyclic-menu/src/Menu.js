/* eslint-disable import/extensions */
import Button from './Button.js';
import isCorrect from './helpers/isCorrect.js';

function getIndex(activeButtonIndex, buttonsLength, step) {
    return Math.abs(activeButtonIndex + step + buttonsLength) % buttonsLength;
}

export default class Menu {
    constructor(buttons = []) {
        this.menuContainer = document.createElement('nav');
        this.menuContainer.className = 'menu';
        this.buttons = buttons.map(element => this.createButton(element));
        // eslint-disable-next-line prefer-destructuring
        this.activeButton = this.buttons[0];
        this.activeButtonIndex = 0;
        this.activeButton.classList.toggle('active');
        this.buttons.forEach((element) => {
            this.menuContainer.appendChild(element);
        });
        this.onKeyDownHandler = function handlerOnKeyDown(event) {
            const keyLeft = 39;
            const keyRight = 37;
            const keyEnter = 13;
            const step = 1;
            switch (event.keyCode) {
            case keyLeft:
                this.setActiveClassTo(getIndex(this.activeButtonIndex, this.buttons.length, step));
                break;
            case keyRight:
                this.setActiveClassTo(getIndex(this.activeButtonIndex, this.buttons.length, -step));
                break;
            case keyEnter:
                document.location.href = this.activeButton.href;
                break;
            default: break;
            }
        };
        this.onRemoveHandler = function onRemoved(mutations) {
            mutations.forEach((mutation) => {
                const nodes = Array.from(mutation.removedNodes);
                const directMatch = nodes.indexOf(this.menuContainer) > -1;
                if (directMatch) {
                    document.removeEventListener('keydown', this.onKeyDownHandler);
                    this.observer.disconnect();
                }
            });
        };
    }

    // eslint-disable-next-line class-methods-use-this
    createButton(text = 'New Button', href = '#') {
        return (new Button(text, href)).item;
    }

    render(parent = document.querySelector('body')) {
        const parentFirstChild = parent.firstChild;
        parent.insertBefore(this.menuContainer, parentFirstChild);

        const config = { childList: true, subtree: true };
        this.observer = new MutationObserver(this.onRemoveHandler.bind(this));
        this.observer.observe(parent, config);

        this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
        document.addEventListener('keydown', this.onKeyDownHandler);
    }

    setActiveClassTo(num = 0) {
        if (isCorrect(num, this.buttons)) {
            this.activeButton.classList.remove('active');
            this.activeButton = this.buttons[num];
            this.activeButton.classList.toggle('active');
            this.activeButtonIndex = this.buttons.indexOf(this.activeButton);
        }
    }

    removeMenu() {
        this.menuContainer.remove();
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
