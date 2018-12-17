/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import Input from './Input.js';
import ItemsBlock from './ItemsBlock.js';

let autoComliteFn;
let maxElementsCount;
const config = { childList: true, subtree: false };
const observer = new MutationObserver(onRemoveHandler);
let form;


export default class AutoComplite {
    constructor(array, AutoCompliteFunction, maxCount = 10) {
        this.container = document.createElement('form');
        this.container.classList.add('autocomplete');
        this.container.autocomplete = 'off';

        this.input = new Input();
        this.itemsBlock = new ItemsBlock();

        this.container.appendChild(this.input.element);
        this.container.appendChild(this.itemsBlock.block);

        autoComliteFn = AutoCompliteFunction(array);
        maxElementsCount = maxCount;
        form = this.container;
        this.input.element.addEventListener('input', onInputHandler);
    }

    render(parent = document.querySelector('body')) {
        const parentFirstChild = parent.firstChild;
        parent.insertBefore(this.container, parentFirstChild);

        observer.observe(parent, config);
    }

    remove() {
        this.container.remove();
    }
}

function onInputHandler(event) {
    const result = autoComliteFn(this.value);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < maxElementsCount; i += 1) {
        if (!result[i]) {
            break;
        }
        const item = document.createElement('div');
        item.innerHTML = `<span>${result[i]}</span>`;
        fragment.appendChild(item);
    }
    const itemsBlock = event.currentTarget.nextElementSibling;
    itemsBlock.innerHTML = '';
    itemsBlock.appendChild(fragment);
}

function onRemoveHandler(mutations) {
    mutations.forEach((mutation) => {
        const nodes = Array.from(mutation.removedNodes);
        const directMatch = nodes.indexOf(form) > -1;
        if (directMatch) {
            form.firstChild.removeEventListener('input', onInputHandler);
            observer.disconnect();
        }
    });
}
