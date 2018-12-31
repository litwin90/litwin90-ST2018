import React from 'react';
import Input from '../components/Input';
import { connect } from 'react-redux'
import FormControl from '../components/FormControl';
import * as actions from '../actions/actionCreators';
import config from '../config';

let FormSignIn = ({ formSignIn, dispatch }) => {
    const gitAuthUrl = `${config.server}${config.port}${config.git}`;
    const googleAuthUrl = `${config.server}${config.port}${config.google}`;
    return (
        <form 
            className="App login"
            onSubmit={
                e => {
                    e.preventDefault();
                    if (formSignIn.isCorrect) {
                        console.log('form-login: data is correct');
                        dispatch(actions.login());
                    } else {
                        console.log('form-login: data is uncorrect');
                    }
                }
            }
            error = {
                formSignIn
                ? ''
                : 'Uncorrect data'
            }
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
                    onChange = {
                        e => {
                            dispatch(actions.changeNameLogin(e.target.value));
                        }
                    }
                    error = {
                        formSignIn.nameIsCorrect
                        ? ''
                        : 'User name is uncorrect. Please enter correct user name'
                    }   
                ></Input>
                <Input header="Password" 
                    type="password" 
                    name="password"
                    plaseHolder="Enter password"
                    onChange = {
                        e => {
                            dispatch(actions.changePassword(e.target.value));
                        }
                    }
                    error = {
                        formSignIn.pswIsCorrect
                        ? ''
                        : 'Password is uncorrect. Please enter correct password'
                    } 
                ></Input>
                <hr/>
            </div>
            <div className="container controls">
                <a href={gitAuthUrl}><div className="git-hub"></div></a>
                <a href={googleAuthUrl}><div className="google"></div></a>
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

const mapStateToProps = (state) => {
    return state;
}

FormSignIn = connect(mapStateToProps)(FormSignIn);

export default FormSignIn;
