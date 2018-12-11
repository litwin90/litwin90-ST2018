// eslint-disable-next-line import/extensions
import Menu from './Menu.js';
// eslint-disable-next-line no-unused-vars
import style from '../css/style.css';


const windowOnLoad = () => {
    const menuElement = new Menu(['Home', 'Domain', 'Hosting', 'Clients', 'Blog', 'Support']);
    const parent = document.querySelector('body');
    menuElement.render(parent);
    menuElement.setButtonHref(0, 'https://github.com/rolling-scopes-school/RS-Short-Track/wiki');
    menuElement.setButtonHref(1, 'https://github.com/rolling-scopes-school');
    menuElement.setButtonHref(2, 'https://github.com/rolling-scopes-school/litwin90-ST2018');
    menuElement.setButtonHref(3, 'https://docs.google.com/spreadsheets/d/1_5-nAn8OALgIqcWDPmIGB8iGDnSFXAJ1pDm1MODebCE/edit');
    menuElement.setButtonHref(4, 'https://rsshorttrack.slack.com/messages/CDTFETX26/');
    menuElement.setButtonHref(5, 'https://rsshorttrack.slack.com/messages/CDTFE7ENN/');

    const config = { childList: true, subtree: true };
    const onRemoveHandler = () => {
        window.removeEventListener('load', windowOnLoad);
        // eslint-disable-next-line no-use-before-define
        observer.disconnect();
    };
    const observer = new MutationObserver(onRemoveHandler);
    observer.observe(parent.parentElement, config);
};

window.addEventListener('load', windowOnLoad);
