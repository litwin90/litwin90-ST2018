import Menu from './src/Menu.js';


const menuElement = new Menu(['Home', 'Domain', 'Hosting', 'Clients', 'Blog', 'Support']);
const parent = document.querySelector('body');
menuElement.append(parent);
