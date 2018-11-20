import Menu from './src/Menu.js';


const menuElement = new Menu(['Home', 'Domain', 'Hosting', 'Clients', 'Blog', 'Support']);
const parent = document.querySelector('body');
menuElement.append(parent);

setTimeout(menuElement.setActiveClassTo.bind(menuElement), 3000, 3);

menuElement.setActiveClassTo(2);
