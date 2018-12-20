const password = document.querySelector('input[name=psw]');
const passwordRepeat = document.querySelector('input[name=psw-repeat]');
const form = document.querySelector('form');

form.addEventListener('submit', () => {
    if (password.value !== passwordRepeat.value) {
        passwordRepeat.setCustomValidity('Password Must be Matching.');
    } else {
        passwordRepeat.setCustomValidity('');
    }
    // form.reportValidity();
}, true);

document.addEventListener('submit', (e) => {
    e.preventDefault();
});
