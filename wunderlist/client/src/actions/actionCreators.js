import * as actionTypes from './actionTypes';
import config from '../config';
import asyncPost from './helpers/asyncPost';
import asyncGet from './helpers/asyncGet';

const { server, port, signIn, signOut, signUp } = config;

export function actionCreator(type, payload) {
    return { type, payload };
}

export function register(userName, password1, password2) {
    const configuration = {
        url: server + port + signUp,
        data: { username: userName, password: password1, passwordRepeat: password2 },
        success: actionTypes.FETCH_REGISTER_SUCCESS,
        failure: actionTypes.FETCH_REGISTER_FAILURE,
        action: actionTypes.FETCH_REGISTER_REQUEST,
    };
    return asyncPost(configuration, actionCreator);
}

export function login(userName, psw) {
    const configuration = {
        url: server + port + signIn,
        data: { username: userName, password: psw },
        success: actionTypes.FETCH_LOGIN_SUCCESS,
        failure: actionTypes.FETCH_LOGIN_FAILURE,
        action: actionTypes.FETCH_LOGIN_REQUEST,
    };
    return asyncPost(configuration, actionCreator);
}

export function logOut() {
    const configuration = {
        url: server + port + signOut,
        success: actionTypes.FETCH_LOGOUT_SUCCESS,
        failure: actionTypes.FETCH_LOGOUT_FAILURE,
        prop: 'isLogOuted',
        action: actionTypes.FETCH_LOGOUT_REQUEST,
    };
    return asyncGet(configuration, actionCreator);
}

export function getSession() {
    const configuration = {
        url: server + port + config.getSession,
        success: actionTypes.FETCH_SESSION_SUCCESS,
        failure: actionTypes.FETCH_SESSION_FAILURE,
        prop: 'username',
        action: actionTypes.FETCH_SESSION_REQUEST,
    };
    return asyncGet(configuration, actionCreator);
}
