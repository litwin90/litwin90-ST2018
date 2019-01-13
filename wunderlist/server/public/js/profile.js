const signOut = document.querySelector('.sign-out');

signOut.addEventListener('click', () => {
    fetch('/auth/logout', { method: 'GET' })
        .then(window.location.reload());
});
