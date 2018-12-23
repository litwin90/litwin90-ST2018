import React from 'react';
import Input from './Input';
import FormControl from './FormControl';
import helpers from '../js/listeners';

class FormSignIn extends React.Component {
    state = {
        firstName: '',
        firstNameError: '',
        password: '',
        passwordError: '',
    };

    render() {
        const {
            firstNameError,
            passwordError,
            submitError,
        } = this.state;
        return (
            <form 
                className="App login"
                onSubmit={helpers.onSignIn.bind(this)}
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
