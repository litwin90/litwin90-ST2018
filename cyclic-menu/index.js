import Menu from './src/Menu.js';


const menuElement = new Menu(['Home', 'Domain', 'Hosting', 'Clients', 'Blog', 'Support']);
const parent = document.querySelector('body');
menuElement.append(parent);

menuElement.setActiveClassTo(3);

menuElement.setActiveClassTo(2);

menuElement.removeItem(7);

menuElement.addItemToPosition(6);

menuElement.addItem('Added item');

menuElement.setItemText(menuElement.items.length - 1);

menuElement.setItemHref(0, 'https://stackoverflow.com/questions/46992463/es6-module-support-in-chrome-62-chrome-canary-64-does-not-work-locally-cors-er?rq=1');

// menuElement.removeItems();
