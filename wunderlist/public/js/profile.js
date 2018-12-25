const signOut = document.querySelector('.sign-out');

signOut.addEventListener('click', () => {
    (async function signout() {
        try {
            await fetch('/auth/logout', {
                method: 'GET',
            });
        } catch (err) {
            console.log(err);
        }
    }());
});
