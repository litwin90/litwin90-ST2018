import signUp from '../js/signUp';
import signIn from '../js/signIn';

function onFirstNameChange(event) {
    this.setState({
        firstName: event.target.value,
    });
}

function onPasswordChange(event) {
    this.setState({
        password: event.target.value,
    });
}

function onPasswordRepeateChange(event) {
    this.setState({
        passwordRepeate: event.target.value,
    });
}

function onFirstNameBlur() {
    const { firstName } = this.state;

    const firstNameError = validateName( firstName );

    return this.setState({ firstNameError });
};

function onPasswordBlur() {
    const { password } = this.state;

    const passwordError = validatePassword( password );

    return this.setState({ passwordError });
};

function onPasswordRepeatBlur() {
    const { passwordRepeate } = this.state;

    const passwordRepeateError = validatePassword( passwordRepeate );

    return this.setState({ passwordRepeateError });
};

function validateName(name) {
    const regex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;

    return !regex.test(name)
        ? "Uncorrect user name"
        : "";
}

function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    return !regex.test(password)
        ? "Uncorrect password"
        : "";
}

function validatePasswordsMatch(password1, password2) {
    return (password1 === password2) ? ('') : ('Passwords should match');
}

function onSignUp(e) {
    e.preventDefault();
    const {
        firstName, 
        password,
        passwordRepeate,
    } = this.state;

    const passwordRepeateError = validatePasswordsMatch(password, passwordRepeate);

    if (passwordRepeateError) {
        this.setState({ passwordRepeateError });
    } else {
        signUp(firstName, password, passwordRepeate);
    }
}

function onSignIn(e) {
    e.preventDefault();
    const { 
        firstName,
        password,
    } = this.state;

    const nameIsCorrect = Boolean(validateName(firstName));
    const passwordIsCorrect = Boolean(validatePassword(password));

    if (nameIsCorrect && passwordIsCorrect) {
        signIn(firstName, password);
    }
}

export default {
    onFirstNameBlur,
    onFirstNameChange,
    onPasswordBlur,
    onPasswordChange,
    onPasswordRepeatBlur,
    onPasswordRepeateChange,
    onSignUp,
    onSignIn,
    validateName,
    validatePassword,
    validatePasswordsMatch,
};
