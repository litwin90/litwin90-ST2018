const form = document.querySelector('form.login');
const userName = document.querySelector('.login input[type = text]');
const psw = document.querySelector('.login input[type = password]');
const errContainer = document.querySelector('.error');
const gitHub = document.querySelector('.git-hub');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const Username = userName.value;
    const Password = psw.value;

    const userNameRegex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const userNameIsCorrect = userNameRegex.test(Username);
    const passwordIsCorrect = passwordRegex.test(Password);

    if (!userNameIsCorrect) {
        errContainer.textContent = 'User name is uncorrect';
    } else if (!passwordIsCorrect) {
        errContainer.textContent = 'Password is uncorrect';
    } else {
        (async function signUp() {
            try {
                const data = JSON.stringify({
                    username: Username,
                    password: Password,
                });
                await fetch('/auth/signin', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data,
                });
                errContainer.textContent = '';
                window.location.assign('/auth/profile');
            } catch (err) {
                window.location.reload();
            }
        }());
    }
});
