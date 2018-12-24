/* eslint-disable import/extensions */
import Autocomplite from './Autocomplite.js';

// eslint-disable-next-line no-unused-vars
import style from '../style/style.css';

const { createAutoComplete } = require('../../auto-complete/index');
const countries = require('../cities');

const windowLoadHandler = () => {
    const autocomplite = new Autocomplite(countries, createAutoComplete);
    const parent = document.querySelector('body');
    autocomplite.render(parent);

    const config = { childList: true, subtree: true };
    const onAfterLoad = () => {
        window.removeEventListener('load', windowLoadHandler);
        // eslint-disable-next-line no-use-before-define
        observer.disconnect();
    };
    const observer = new MutationObserver(onAfterLoad);
    observer.observe(parent.parentElement, config);
};

window.addEventListener('load', windowLoadHandler);
