import corsConfig from './corsConfig';

const signin = (Username, Password) => {
    const url = `${corsConfig.server}${corsConfig.signIn}`;
    (async function signUp() {
        try {
            const data = JSON.stringify({
                username: Username,
                password: Password,
            });
            await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data,
            });
            // window.location.assign('/auth/profile');
        } catch (err) {
            // window.location.reload();
        }
    }());
};

export default signin;
