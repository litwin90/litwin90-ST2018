/* eslint-disable import/extensions */
import requestForUser from './request.js';

const passwordInput = document.querySelector('input[name=password]');
const passwordRepeatInput = document.querySelector('input[name=passwordRepeat]');
const form = document.querySelector('form');
const userInput = document.querySelector('input[name=username]');
const errContainer = document.querySelector('.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = userInput.value;
    const password = passwordInput.value;
    const passwordRepeat = passwordRepeatInput.value;

    requestForUser(userName, password, passwordRepeat, '/auth/signup', errContainer);
});
