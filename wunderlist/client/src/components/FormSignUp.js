import React from 'react';
import Input from './Input';
import FormControl from './FormControl';

class FormSignUp extends React.Component {
    state = {
        firstName: '',
        firstNameError: '',
        password: '',
        passwordError: '',
        passwordRepeate: '',
        passwordRepeateError: '',
    };

    onFirstNameChange = event => {
        this.setState({
            firstName: event.target.value,
        });
    }

    onPasswordChange = event => {
        this.setState({
            password: event.target.value,
        });
    }
    
    onPasswordRepeateChange = event => {
        this.setState({
            passwordRepeate: event.target.value,
        });
    }



    onFirstNameBlur = () => {
        const { firstName } = this.state;
    
        const firstNameError = this.validateName( firstName );
    
        return this.setState({ firstNameError });
    };

    onPasswordBlur = () => {
        const { password } = this.state;
    
        const passwordError = this.validatePassword( password );
    
        return this.setState({ passwordError });
    };

    onPasswordRepeatBlur = () => {
        const { passwordRepeate } = this.state;
    
        const passwordRepeateError = this.validatePassword( passwordRepeate );
    
        return this.setState({ passwordRepeateError });
    };

    validateName = name => {
        const regex = /[A-Za-z]{3,}/;

        return !regex.test(name)
            ? "Uncorrect user name"
            : "";
    }

    validatePassword = password => {
        const regex = /[A-Za-z]{3,}/;

        return !regex.test(password)
            ? "Uncorrect password"
            : "";
    }

    validatePasswordsMatch = (password1, password2) => {
        return (password1 === password2) ? ('') : ('Passwords should match');
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const { 
            password,
            passwordRepeate,
        } = this.state;

        const passwordRepeateError = this.validatePasswordsMatch(password, passwordRepeate);

        return this.setState({ passwordRepeateError });
    }

    render() {
        const {
            firstNameError,
            passwordError,
            passwordRepeateError,
            submitError,
        } = this.state;
        return (
            <form 
                className="App register-form"
                onSubmit={this.onSubmit}
                error = {submitError}
            >
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr/>
                    <Input 
                        header="User Name" 
                        type="text" 
                        name="username"
                        plaseHolder="Enter user name" 
                        onChange = {this.onFirstNameChange}
                        onBlur = {this.onFirstNameBlur}
                        error = {firstNameError}   
                    ></Input>
                    <Input header="Password" 
                        type="password" 
                        name="password"
                        plaseHolder="Enter password"
                        onChange = {this.onPasswordChange}
                        onBlur = {this.onPasswordBlur}
                        error = {passwordError} 
                    ></Input>
                    <Input header="Repeat Password" 
                        type="password" 
                        name="passwordRepeat"
                        plaseHolder="Repeat password"
                        onChange = {this.onPasswordRepeateChange}
                        onBlur = {this.onPasswordRepeatBlur}
                        error = {passwordRepeateError} 
                    ></Input>
                    <hr/>
                </div>
                <div className="container controls">
                    <div className="git-hub"></div>
                    <FormControl
                        type="submit"
                        value="Register" 
                        className="registerbtn">
                    </FormControl>
                    <FormControl
                        type="reset"
                        value="Cancel" 
                        className="cancelbtn">
                    </FormControl>
                    <p>Already have an account? <a href="/signin">Sign in</a>.</p>
                </div>
            </form>
        );
    }
}

export default FormSignUp;
