import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreators';
import { CHANGE_NAME_SIGN_IN, CHANGE_PASSWORD, CANCEL_SIGN_IN } from '../actions/actionTypes';
import constants from './constants';
import config from '../config';
import Form from './Form';

class FormSignIn extends Component {
    render() {
        const { display } = this.props.registration;
        const 
        { 
            passwordIsTyped,
            passwordIsCorrect,
            nameIsTyped,
            nameIsCorrect,
        } = this.props.formSignIn;
        const gitUrl = config.server + config.port + config.git;
        const googleUrl = config.server + config.port + config.google;
        return (
            <Form
                className="App login"
                onSubmit={this.formOnSubmit.bind(this)}
                displayState={display}
                header="SignIn"
                description="Please fill in this form to sign in"
                inputs={[
                    {
                        header: "User Name",
                        type: "text",
                        name: "username",
                        plaseHolder: "Enter user name" ,
                        onChange: this.action.call(this, CHANGE_NAME_SIGN_IN),
                        error: this.error.call(this, nameIsTyped, nameIsCorrect, constants.nameError),
                    },
                    {
                        type: "password", 
                        name: "password",
                        plaseHolder: "Enter password",
                        onChange: this.action.call(this, CHANGE_PASSWORD),
                        error: this.error.call(this, passwordIsTyped, passwordIsCorrect, constants.passwordError ),
                    },
                ]}
                gitUrl={gitUrl}
                googleUrl={googleUrl}
                cancel={this.action.call(this, CANCEL_SIGN_IN)}
                submit={{
                    text: "Login"
                }}
            >
            </Form>
        ); 
    }
    formOnSubmit(e) {
        const { isCorrect, userName, password } = this.props.formSignIn;
        const { login } = this.props.pageActions;
        e.preventDefault();
        if (isCorrect) {
            login(userName, password);
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
        pageActions: bindActionCreators(actions, dispatch),
    }
}

FormSignIn = connect(mapStateToProps, mapActionsToProps)(FormSignIn);

export default FormSignIn;
