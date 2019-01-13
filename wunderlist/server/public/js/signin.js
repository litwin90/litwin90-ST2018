/* eslint-disable import/extensions */
import requestForUser from './request.js';

const form = document.querySelector('form.login');
const userName = document.querySelector('.login input[type = text]');
const psw = document.querySelector('.login input[type = password]');
const errContainer = document.querySelector('.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const Username = userName.value;
    const Password = psw.value;

    requestForUser(Username, Password, undefined, '/auth/signin', errContainer);
});
