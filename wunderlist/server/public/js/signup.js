const form = document.querySelector('form');
const errContainer = document.querySelector('.error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const Username = e.target[0].value;
    const Password = e.target[1].value;
    const PasswordRepeat = e.target[2].value;

    const passportsMatch = Password === PasswordRepeat;
    const userNameRegex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const userNameIsCorrect = userNameRegex.test(Username);
    const passwordIsCorrect = passwordRegex.test(Password);

    if (!passportsMatch) {
        errContainer.textContent = 'Passwords shoul match';
    } else if (!userNameIsCorrect) {
        errContainer.textContent = 'User name is uncorrect';
    } else if (!passwordIsCorrect) {
        errContainer.textContent = 'Password is uncorrect';
    } else {
        (async function signUp() {
            try {
                const data = JSON.stringify({
                    username: Username,
                    password: Password,
                    passwordRepeat: PasswordRepeat,
                });
                await fetch('/auth/signup', {
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
