import React from 'react';
import Input from '../components/Input';
import { connect } from 'react-redux'
import FormControl from '../components/FormControl';
import * as actions from '../actions/actionCreators';

let FormSignIn = ({ formSignIn, dispatch }) => {
    return (
        <form 
            className="App login"
            onSubmit={
                e => {
                    e.preventDefault();
                    if (formSignIn.isCorrect) {
                        console.log('form-login: data is correct');
                        dispatch(actions.fetchLogin(formSignIn.userName, formSignIn.psw));
                    } else {
                        console.log('form-login: data is uncorrect');
                    }
                }
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
                    onChange = {e => {
                            console.log('name changed');
                            dispatch(actions.changeNameLogin(e.target.value));
                    }}
                    error = {
                        formSignIn.nameIsTyped
                        ? (formSignIn.nameIsCorrect
                            ? ''
                            : 'User name is uncorrect. Please enter correct user name')
                        : ('')
                    }   
                ></Input>
                <Input header="Password" 
                    type="password" 
                    name="password"
                    plaseHolder="Enter password"
                    onChange = {e => {
                            console.log('password changed');
                            dispatch(actions.changePassword(e.target.value));
                    }}
                    error = {
                        formSignIn.pswIsTyped
                        ? (formSignIn.pswIsCorrect
                            ? ''
                            : 'Password is uncorrect. Please enter correct password')
                        : ('')
                    } 
                ></Input>
                <hr/>
            </div>
            <div className="container controls">
                <div className="git-hub" onClick={() => {
                    dispatch(actions.fetchLoginGitHub());
                }}></div>
                <div className="google" onClick={() => {
                    dispatch(actions.fetchLoginGoogle());
                }}></div>
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
                    className="cancelbtn"onClick={() => {
                        console.log('canseled');
                        dispatch(actions.canselSignIn())
                    }}
                >
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
