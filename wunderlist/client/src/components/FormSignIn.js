import React from 'react';
import Input from './Input';
import FormControl from './FormControl';

class FormSignIn extends React.Component {
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
            submitError,
        } = this.state;
        return (
            <form 
                className="App login"
                onSubmit={this.onSubmit}
                error = {submitError}
            >
                <div className="container">
                    <h1>SignIn</h1>
                    <p>Please fill in this form to sign in</p>
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
                    <hr/>
                </div>
                <div className="container controls">
                    <div className="git-hub"></div>
                    <FormControl
                        type="submit"
                        value="Login" 
                        className="">
                    </FormControl>

                    <p>or</p>

                    <a className = "register" href="/">Register</a>
                    <FormControl
                        type="reset"
                        value="Cancel" 
                        className="cancelbtn">
                    </FormControl>
                </div>
            </form>
        );
    }
}

export default FormSignIn;
