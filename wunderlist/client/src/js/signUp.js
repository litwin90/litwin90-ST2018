import corsConfig from './corsConfig';

const signup = (Username, Password, PasswordRepeat) => {
    const url = `${corsConfig.server}${corsConfig.signUp}`;
    (async function signUp() {
        try {
            const data = JSON.stringify({
                username: Username,
                password: Password,
                passwordRepeat: PasswordRepeat,
            });
            await fetch(url , {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data,
            });
            // window.location.reload();
        } catch (err) {
            // window.location.reload();
        }
    }());
};

export default signup;
