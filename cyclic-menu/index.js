import Menu from './src/Menu.js';
import MenuItem from './src/MenuItem.js';


const menuElement = new Menu(['Home', 'Domain', 'Hosting', 'Clients', 'Blog', 'Support']);
const parent = document.querySelector('body');
menuElement.append(parent);

setTimeout(menuElement.setActiveClassTo.bind(menuElement), 3000, 3);

menuElement.setActiveClassTo(2);

setTimeout(menuElement.removeItem.bind(menuElement), 5000, 3);

setTimeout(menuElement.removeItems.bind(menuElement), 7000);
