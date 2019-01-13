/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import regex from './regex.js';

async function requestForUser(username, password, passwordRepeat, url, errContainer) {
    const passportsMatch = password === passwordRepeat;
    const userNameIsCorrect = regex.userName.test(username);
    const passwordIsCorrect = regex.password.test(password);

    if (!passportsMatch && url === '/auth/signup') {
        errContainer.textContent = 'Passwords should match';
    } else if (!userNameIsCorrect) {
        errContainer.textContent = 'User name is incorrect';
    } else if (!passwordIsCorrect) {
        errContainer.textContent = 'Password is incorrect';
    } else {
        try {
            const data = JSON.stringify({
                username,
                password,
                passwordRepeat,
            });
            await fetch(url, {
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
            errContainer.textContent = err.message;
        }
    }
}

export default requestForUser;
