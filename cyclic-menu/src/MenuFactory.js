import Button from './Button.js';

export default class MenuFactory {
    static createButton(text = 'New Button', href = '#') {
        return new Button(text, href);
    }
}
