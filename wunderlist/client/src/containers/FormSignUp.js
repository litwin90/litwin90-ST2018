import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreators';
import { CHANGE_NAME_SIGN_UP, CHANGE_PASSWORD_1, CHANGE_PASSWORD_2, CANCEL_SIGN_UP } from '../actions/actionTypes';
import constants from './constants';
import config from '../config';
import Form from './Form';

class FormSignUp extends Component {
    render() {
        const { display } = this.props.registration;
        const gitUrl = config.server + config.port + config.git;
        const googleUrl = config.server + config.port + config.google;
        const {
            nameIsTyped,
            password1IsTyped,
            password2IsTyped,
            nameIsCorrect,
            password1IsCorrect,
            password2IsCorrect,
        } = this.props.formSignUp;
        return (
            <Form
                className="App register-form"
                onSubmit={this.formOnSubmit.bind(this)}
                displayState={display}
                header="Register"
                description="Please fill in this form to create an account"
                inputs={[
                    {
                        header: "User Name",
                        type: "text", 
                        name: "username",
                        plaseHolder: "Enter user name",
                        onChange: this.action.call(this, CHANGE_NAME_SIGN_UP),
                        error: this.error.call(this, nameIsTyped, nameIsCorrect, constants.nameError),
                    },
                    {
                        header: "Password", 
                        type: "password", 
                        name: "password",
                        plaseHolder: "Enter password",
                        onChange: this.action.call(this, CHANGE_PASSWORD_1),
                        error: this.error.call(this, password1IsTyped, password1IsCorrect, constants.passwordError ), 
                    },
                    {
                        header: "Repeat Password", 
                        type: "password", 
                        name: "passwordRepeat",
                        plaseHolder: "Repeat password",
                        onChange: this.action.call(this, CHANGE_PASSWORD_2),
                        error: this.error.call(this, password2IsTyped, password2IsCorrect, constants.passwordError ), 
                    }
                ]}
                gitUrl={gitUrl}
                googleUrl={googleUrl}
                cancel={this.action.call(this, CANCEL_SIGN_UP)}
                submit={{
                    text: "Register",
                }}
            ></Form>
        );
    }
    formOnSubmit(e) {
        const { isCorrect, userName, password1, password2 } = this.props.formSignUp;
        const { register } = this.props.pageActions;
        e.preventDefault();
        if (isCorrect) {
            register(userName, password1, password2);
        }
    }
    action(actionType) {
        const { actionCreator } = this.props.pageActions;
        return (e) => { actionCreator(actionType, e.target.value)}
    }
    error(isTyped, isCorrect, errMessage) {
        if (isTyped) {
            return isCorrect ? '' : errMessage;
        } 
        return '';
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapActionsToProps = (dispatch) => {
    return {
        pageActions: bindActionCreators(actions, dispatch)
    }
}

FormSignUp = connect(mapStateToProps, mapActionsToProps)(FormSignUp);

export default FormSignUp;
