const password = document.querySelector('input[name = psw]');
const passwordRepeat = document.querySelector('input[name = psw-repeat]');

passwordRepeat.addEventListener('input', () => {
    if (password.value !== passwordRepeat.value) {
        passwordRepeat.setCustomValidity('Password Must be Matching.');
    } else {
        passwordRepeat.setCustomValidity('');
    }
});

document.addEventListener('submit', (e) => {
    e.preventDefault();
});
