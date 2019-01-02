import initialState from './initialState';
import { 
    FETCH_REGISTER_FAILURE,
    FETCH_REGISTER_SUCCESS,
    FETCH_REGISTER_REQUEST,

    FETCH_LOGOUT_FAILURE,
    FETCH_LOGOUT_SUCCESS,
    FETCH_LOGOUT_REQUEST,

    FETCH_LOGIN_FAILURE,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_REQUEST,

    FETCH_LOGIN_GITHUB_SUCCESS,
    FETCH_LOGIN_GITHUB_FAILURE,
    FETCH_LOGIN_GITHUB_REQUEST,

    FETCH_LOGIN_GOOGLE_SUCCESS,
    FETCH_LOGIN_GOOGLE_FAILURE,
    FETCH_LOGIN_GOOGLE_REQUEST,
} from '../actions/actionTypes';

export default function registration(state = initialState.registration, action) {
    switch (action.type) {
        // REGISTRATION
        case(FETCH_REGISTER_REQUEST):
            console.log(FETCH_REGISTER_REQUEST);
            return Object.assign({}, state, {
                isFething: true,
                registerErr: undefined,
            });
        case(FETCH_REGISTER_SUCCESS):
            console.log(FETCH_REGISTER_SUCCESS);
            return Object.assign({}, state, {
                userName: action.data.username,
                isFething: false,
                isLoggedIn: true,
                registerErr: undefined,
            });
        case(FETCH_REGISTER_FAILURE):
            console.log(FETCH_REGISTER_FAILURE);
            return Object.assign({}, state, {
                isFething: false,
                isLoggedIn: false,
                registerErr: action.data.error,
            });

        // LOGIN
        case(FETCH_LOGIN_REQUEST):
            console.log(FETCH_LOGIN_REQUEST);
            return Object.assign({}, state, {
                isFething: true,
                registerErr: undefined,
            });
        case(FETCH_LOGIN_SUCCESS):
            console.log(FETCH_LOGIN_SUCCESS);
            return Object.assign({}, state, {
                userName: action.data.username,
                isFething: false,
                isLoggedIn: true,
                registerErr: undefined,
            });
        case(FETCH_LOGIN_FAILURE):
            console.log(FETCH_LOGIN_FAILURE);
            return Object.assign({}, state, {
                isFething: false,
                isLoggedIn: false,
                registerErr: action.data.error,
            });

        // LOGOUT
        case(FETCH_LOGOUT_REQUEST):
            console.log(FETCH_LOGOUT_REQUEST);
            return Object.assign({}, state, {
                isFething: true,
            });
        case(FETCH_LOGOUT_SUCCESS):
            console.log(FETCH_LOGOUT_SUCCESS);
            return Object.assign({}, state, {
                userName: undefined,
                isFething: false,
                isLoggedIn: false,
            });
        case(FETCH_LOGOUT_FAILURE):
            console.log(FETCH_LOGOUT_FAILURE);
            return Object.assign({}, state, {
                isFething: false,
            });
        
        // LOGIN GITHUB
        case(FETCH_LOGIN_GITHUB_REQUEST):
            console.log(FETCH_LOGIN_GITHUB_REQUEST);
            return Object.assign({}, state, {
                isFething: true,
            });
        case(FETCH_LOGIN_GITHUB_SUCCESS):
            console.log(FETCH_LOGIN_GITHUB_SUCCESS);
            return Object.assign({}, state, {
                userName: action.data.username,
                isFething: false,
                isLoggedIn: true,
            });
        case(FETCH_LOGIN_GITHUB_FAILURE):
            console.log(FETCH_LOGIN_GITHUB_FAILURE);
            return Object.assign({}, state, {
                isFething: false,
                isLoggedIn: false,
            });

        // LOGIN GOOGLE
        case(FETCH_LOGIN_GOOGLE_REQUEST):
            console.log(FETCH_LOGIN_GOOGLE_REQUEST);
            return Object.assign({}, state, {
                isFething: true,
            });
        case(FETCH_LOGIN_GOOGLE_SUCCESS):
            console.log(FETCH_LOGIN_GOOGLE_SUCCESS);
            return Object.assign({}, state, {
                userName: action.data.username,
                isFething: false,
                isLoggedIn: true,
            });
        case(FETCH_LOGIN_GOOGLE_FAILURE):
            console.log(FETCH_LOGIN_GOOGLE_FAILURE);
            return Object.assign({}, state, {
                isFething: false,
                isLoggedIn: false,
            });
        default:
            return state;
    }
}
