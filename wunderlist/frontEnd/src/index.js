const form = document.querySelector('form.login');
const userName = document.querySelector('.login input[type = text]');
const psw = document.querySelector('.login input[type = password]');

const emailRegex = /\w+@{1}\w+\.{1}\w+/;

form.addEventListener('submit', (e) => {
    const emailEntered = emailRegex.test(userName.value);
    e.preventDefault();
    if (emailEntered) {
        
    } else {
        
    }
});
