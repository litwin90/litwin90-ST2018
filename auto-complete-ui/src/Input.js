export default class Input {
    constructor(config = {
        id: 'myInput',
        type: 'text',
        name: 'myAutocomplite',
        placeholder: 'Cities',
    }) {
        this.element = document.createElement('input');
        this.element.id = config.id;
        this.element.type = config.type;
        this.element.name = config.name;
        this.element.placeholder = config.placeholder;
    }
}
