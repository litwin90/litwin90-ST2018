import Menu from './src/Menu.js';


const menuElement = new Menu('menu', ['Home', 'Domain', 'Hosting', 'Clients', 'Blog', 'Support']);
const parent = document.querySelector('body');
menuElement.render(parent);

menuElement.setActiveClassTo(3);

menuElement.setActiveClassTo(2);

menuElement.removeButton(1);

menuElement.addButtonToPosition(6);

menuElement.addButton('Added item');

menuElement.setButtonText(menuElement.buttons.length - 1);

menuElement.addButtonToPosition(3);

menuElement.setButtonHref(0, 'https://stackoverflow.com/questions/46992463/es6-module-support-in-chrome-62-chrome-canary-64-does-not-work-locally-cors-er?rq=1');
