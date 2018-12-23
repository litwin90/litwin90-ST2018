import React from 'react';
import Input from './Input';
import FormControl from './FormControl';
import helpers from '../js/listeners';

class FormSignUp extends React.Component {
    state = {
        firstName: '',
        firstNameError: '',
        password: '',
        passwordError: '',
        passwordRepeate: '',
        passwordRepeateError: '',
    };

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
                onSubmit={helpers.onSignUp.bind(this)}
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
                        onChange = {helpers.onFirstNameChange.bind(this)}
                        onBlur = {helpers.onFirstNameBlur.bind(this)}
                        error = {firstNameError}   
                    ></Input>
                    <Input header="Password" 
                        type="password" 
                        name="password"
                        plaseHolder="Enter password"
                        onChange = {helpers.onPasswordChange.bind(this)}
                        onBlur = {helpers.onPasswordBlur.bind(this)}
                        error = {passwordError} 
                    ></Input>
                    <Input header="Repeat Password" 
                        type="password" 
                        name="passwordRepeat"
                        plaseHolder="Repeat password"
                        onChange = {helpers.onPasswordRepeateChange.bind(this)}
                        onBlur = {helpers.onPasswordRepeateChange.bind(this)}
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
