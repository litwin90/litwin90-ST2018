const signOut = document.querySelector('.sign-out');

signOut.addEventListener('click', () => {
    (async function signout() {
        try {
            await fetch('/auth/logout', {
                method: 'GET',
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }());
});
