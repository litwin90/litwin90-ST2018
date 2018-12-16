/* eslint-disable quote-props */
const form = document.querySelector('form.login');
const userName = document.querySelector('.login input[type = text]');
const psw = document.querySelector('.login input[type = password]');

// const emailRegex = /\w+@{1}\w+\.{1}\w+/;

form.addEventListener('submit', () => {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName.value, password: psw.value }),
    })
        .then(() => {
            window.location = '/';
        })
        .catch(() => {
            window.location = '/';
        });
});
