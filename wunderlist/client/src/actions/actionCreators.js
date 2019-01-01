import * as actionTypes from './actionTypes';
import config from '../config';

const url = config.server + config.port;

export function changeNameRegister(name) {
    return {
        type: actionTypes.CHANGE_NAME_SIGN_UP,
        userName: name,
    }
}

export function changeNameLogin(name) {
    return {
        type: actionTypes.CHANGE_NAME_SIGN_IN,
        userName: name,
    }
}


export function changePassword(psw) {
    return {
        type: actionTypes.CHANGE_PASSWORD,
        psw,
    }
}

export function changePsw1(psw1) {
    return {
        type: actionTypes.CHANGE_PSW1,
        psw1,
    }
}

export function changePsw2(psw2) {
    return {
        type: actionTypes.CHANGE_PSW2,
        psw2,
    }
}

export function register() {
    return {
        type: actionTypes.REGISTER,
        url: url + config.signUp,
    }
}

export function login() {
    return {
        type: actionTypes.LOGIN,
        url: url + config.signIn,
    }
}

export function canselSignUp() {
    return {
        type: actionTypes.CANSEL_SIGN_UP,
    }
}

export function canselSignIn() {
    return {
        type: actionTypes.CANSEL_SIGN_IN,
    }
}
