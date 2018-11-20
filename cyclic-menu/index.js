import Menu from './src/Menu.js';


const menuElement = new Menu(['Home', 'Domain', 'Hosting', 'Clients', 'Blog', 'Support']);
const parent = document.querySelector('body');
menuElement.append(parent);

setTimeout(menuElement.setActiveClassTo.bind(menuElement), 3000, 3);

menuElement.setActiveClassTo(2);

setTimeout(menuElement.removeItem.bind(menuElement), 5000, 7);

setTimeout(menuElement.addItemToPosition.bind(menuElement), 7000, 6);

setTimeout(menuElement.removeItems.bind(menuElement), 12000);
