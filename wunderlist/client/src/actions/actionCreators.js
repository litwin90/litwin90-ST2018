import * as actionTypes from './actionTypes';
import config from '../config';
import fetch from 'isomorphic-fetch'

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


// ASYNC REGISTRATION
export function requestRegister() {
    return {
        type: actionTypes.FETCH_REGISTER_REQUEST,
    }
}

export function receiveRegistration(responce) {
    return {
        type: actionTypes.FETCH_REGISTER_SUCCESS,
        data: responce,
    }
}

export function rejectRegistration(responce) {
    return {
        type: actionTypes.FETCH_REGISTER_FAILURE,
        data: responce,
    }
}

// LOGIN
export function requestLogin() {
    return {
        type: actionTypes.FETCH_LOGIN_REQUEST,
    }
}

export function receiveLogin(responce) {
    return {
        type: actionTypes.FETCH_LOGIN_SUCCESS,
        data: responce,
    }
}

export function rejectLogin(responce) {
    return {
        type: actionTypes.FETCH_LOGIN_FAILURE,
        data: responce,
    }
}

// LOGOUT
export function requestLogOut() {
    return {
        type: actionTypes.FETCH_LOGOUT_REQUEST,
    }
}

export function receiveLogOut(responce) {
    return {
        type: actionTypes.FETCH_LOGOUT_SUCCESS,
        data: responce,
    }
}

export function rejectLogOut(responce) {
    return {
        type: actionTypes.FETCH_LOGOUT_FAILURE,
        data: responce,
    }
}

// LOGIN GITHUB
export function requestLoginGitHub() {
    return {
        type: actionTypes.FETCH_LOGIN_GITHUB_REQUEST,
    }
}

export function receiveLoginGitHub(responce) {
    return {
        type: actionTypes.FETCH_LOGIN_GITHUB_SUCCESS,
        data: responce,
    }
}

export function rejectLoginGitHub(responce) {
    return {
        type: actionTypes.FETCH_LOGIN_GITHUB_FAILURE,
        data: responce,
    }
}

// LOGIN GOOGLE
export function requestLoginGoogle() {
    return {
        type: actionTypes.FETCH_LOGIN_GOOGLE_REQUEST,
    }
}

export function receiveLoginGoogle(responce) {
    return {
        type: actionTypes.FETCH_LOGIN_GOOGLE_SUCCESS,
        data: responce,
    }
}

export function rejectLoginGoogle(responce) {
    return {
        type: actionTypes.FETCH_LOGIN_GOOGLE_FAILURE,
        data: responce,
    }
}

// ASYNC ACTIONS
export function fetchRegister(userName, psw1, psw2) {
    return function(dispatch) {
        dispatch(requestRegister());
        const registerUrl = url + config.signUp;
        return fetch(registerUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: psw1,
                passwordRepeat: psw2,
            }),
        })
            .then(response => response.json())
            .then(response => {
                if (response.username) {
                    dispatch(receiveRegistration(response))
                } else {
                    dispatch(rejectRegistration(response));
                }
            })
    }
}

export function fetchLogin(userName, psw) {
    return function(dispatch) {
        dispatch(requestLogin());
        const loginUrl = url + config.signIn;
        return fetch(loginUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: psw,
            }),
        })
            .then(response => response.json())
            .then(response => {
                if (response.username) {
                    dispatch(receiveLogin(response))
                } else {
                    dispatch(rejectLogin(response));
                }
            })
    }
}

export function fetchLogOut() {
    return function(dispatch) {
        dispatch(requestLogOut());
        const logOutUrl = url + config.signOut;
        return fetch(logOutUrl)
            .then(response => response.json())
            .then(response => {
                if (response.isLogOuted) {
                    dispatch(receiveLogOut(response))
                } else {
                    dispatch(rejectLogOut(response));
                }
            })
    }
}

export function fetchLoginGitHub() {
    return function(dispatch) {
        dispatch(requestLoginGitHub());
        const loginGitHubUrl = url + config.git;
        return fetch(loginGitHubUrl, {
            credentials: 'include',
            mode: 'no-cors',
        })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(response => {
            if (response.username) {
                dispatch(receiveLoginGitHub(response))
            } else {
                dispatch(rejectLoginGitHub(response));
            }
        })
    }
}

export function fetchLoginGoogle() {
    return function(dispatch) {
        dispatch(requestLoginGitHub());
        const loginGitHubUrl = url + config.git;
        return fetch(loginGitHubUrl, {
            credentials: 'include',
            mode: 'no-cors',
        })
            .then(response => response.json())
            .then(response => {
            if (response.username) {
                dispatch(receiveLoginGoogle(response))
            } else {
                dispatch(rejectLoginGoogle(response));
            }
        })
    }
}
