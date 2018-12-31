export default {
    server: 'http://localhost:',
    port: '4000',
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    git: '/auth/git-hub',
    google: '/auth/google',
    regexName: /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
    regexPsw: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,24}$/,
};
