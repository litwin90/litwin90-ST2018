/* eslint-disable no-unused-vars */
/* eslint-disable quote-props */
const form = document.querySelector('form.login');
const userName = document.querySelector('.login input[type = text]');
const psw = document.querySelector('.login input[type = password]');

const emailRegex = /\w+@{1}\w+\.{1}\w+/;

form.addEventListener('submit', (e) => {
    // const emailEntered = emailRegex.test(userName.value);
    e.preventDefault();
    // if (emailEntered) {
    // } else {
    // }
    const data = new FormData();
    data.append('json', JSON.stringify({
        email: userName.value,
        psw: psw.value,
    }));
    fetch('/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userName.value, psw: psw.value }),
    })
        .then((data1) => {
            console.log('Request success: ', data1);
        })
        .catch((error) => {
            console.log('Request failure: ', error);
        });
});
