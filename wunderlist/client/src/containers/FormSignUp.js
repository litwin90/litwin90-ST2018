import React from 'react';
import Input from '../components/Input';
import { connect } from 'react-redux'
import FormControl from '../components/FormControl';
import * as actions from '../actions/actionCreators';
import config from '../config';

let FormSignUp = ({ formSignUp, dispatch }) => {
    const gitAuthUrl = `${config.server}${config.port}${config.git}`;
    const googleAuthUrl = `${config.server}${config.port}${config.google}`;
    return (
        <form 
            className="App register-form"
            onSubmit={
                e => {
                    e.preventDefault();
                    if (formSignUp.isCorrect) {
                        console.log('Form is correct');
                        dispatch(actions.register());
                    } else {
                        console.log('form is not correct');
                    }
                }
            }
        >
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>
                <Input header="User Name" 
                    type="text" 
                    name="username"
                    plaseHolder="Enter user name" 
                    onChange = {e => {
                        console.log('name changed');
                        dispatch(actions.changeNameRegister(e.target.value));
                    }}
                    error = {
                        formSignUp.nameIsTyped
                        ? (formSignUp.nameIsCorrect
                            ? '' 
                            : 'User name is uncorrect, please enter correct user name')
                        : ('')
                    }   
                ></Input>
                <Input header="Password" 
                    type="password" 
                    name="password"
                    plaseHolder="Enter password"
                    onChange = {e => {
                        console.log('password1 changed');
                        dispatch(actions.changePsw1(e.target.value));
                    }}
                    error = {
                        formSignUp.psw1IsTyped
                        ? (formSignUp.psw1IsCorrect
                            ? '' 
                            : 'Password is uncorrect, please enter correct password')
                        : ('')
                    }
                ></Input>
                <Input header="Repeat Password" 
                    type="password" 
                    name="passwordRepeat"
                    plaseHolder="Repeat password"
                    onChange = {e => {
                        console.log('password2 changed');
                        dispatch(actions.changePsw2(e.target.value))
                    }}
                    error = {
                        formSignUp.psw2IsTyped 
                        ? (formSignUp.psw2IsCorrect && formSignUp.isCorrect
                            ? '' 
                            : 'Password is uncorrect, please enter correct password') 
                        : ('')
                    }
                ></Input>
                <hr/>
            </div>
            <div className="container controls">
                <a href={gitAuthUrl}><div className="git-hub"></div></a>
                <a href={googleAuthUrl}><div className="google"></div></a>
                <FormControl
                    type="submit"
                    value="Register" 
                    className="registerbtn">
                </FormControl>
                <FormControl
                    type="reset"
                    value="Cancel" 
                    className="cancelbtn"
                    onClick={() => {
                        console.log('canseled');
                        dispatch(actions.canselSignUp())
                    }}
                >
                </FormControl>
                <p>Already have an account? <a href="/signin">Sign in</a>.</p>
            </div>
        </form>
    );
}

const mapStateToProps = (state) => {
    return state;
}

FormSignUp = connect(mapStateToProps)(FormSignUp);

export default FormSignUp;
