/* eslint-disable quote-props */
// import { METHODS } from "http";

const user = document.querySelector('input[name = username]');
const password = document.querySelector('input[name=password]');
const passwordRepeat = document.querySelector('input[name=psw-repeat]');
const form = document.querySelector('form');

form.addEventListener('submit', () => {
    if (password.value !== passwordRepeat.value) {
        passwordRepeat.setCustomValidity('Password Must be Matching.');
    } else {
        passwordRepeat.setCustomValidity('');
    }
}, true);

document.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.value, password: password.value }),
    })
        .then((data1) => {
            console.log('Request success: ', data1);
            window.location = '/';
        })
        .catch((error) => {
            console.log('Request failure: ', error);
        });
});
