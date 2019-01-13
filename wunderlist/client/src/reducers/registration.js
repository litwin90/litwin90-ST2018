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

    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE,
    FETCH_SESSION_REQUEST,
} from '../actions/actionTypes';

const registrationState = {
    userName: undefined,
    isLoggedIn: false,
    isFething: false,
    registerErr: undefined,
    display: 'block',
}

export default function registration(state = registrationState, action) {
    switch (action.type) {
        // REGISTRATION
        case(FETCH_REGISTER_REQUEST):
            return Object.assign({}, state, {
                isFething: true,
                registerErr: undefined,
            });
        case(FETCH_REGISTER_SUCCESS):
            return Object.assign({}, state, {
                userName: action.payload.username,
                isFething: false,
                isLoggedIn: true,
                registerErr: undefined,
                display: 'none',
            });
        case(FETCH_REGISTER_FAILURE):
            return Object.assign({}, state, {
                isFething: false,
                isLoggedIn: false,
                registerErr: action.payload.error,
                display: 'block',
            });

        // LOGIN
        case(FETCH_LOGIN_REQUEST):
            return Object.assign({}, state, {
                isFething: true,
                registerErr: undefined,
            });
        case(FETCH_LOGIN_SUCCESS):
            return Object.assign({}, state, {
                userName: action.payload.username,
                isFething: false,
                isLoggedIn: true,
                display: 'none',
                registerErr: undefined,
            });
        case(FETCH_LOGIN_FAILURE):
            return Object.assign({}, state, {
                isFething: false,
                isLoggedIn: false,
                display: 'block',
                registerErr: action.payload.error,
            });

        // LOGOUT
        case(FETCH_LOGOUT_REQUEST):
            return Object.assign({}, state, {
                isFething: true,
            });
        case(FETCH_LOGOUT_SUCCESS):
            return Object.assign({}, state, {
                userName: undefined,
                isFething: false,
                isLoggedIn: false,
                display: 'block',
            });
        case(FETCH_LOGOUT_FAILURE):
            return Object.assign({}, state, {
                isFething: false,
            });

        // session
        case(FETCH_SESSION_REQUEST):
            return Object.assign({}, state, {
                isFething: true,
            });
        case(FETCH_SESSION_SUCCESS):
            return Object.assign({}, state, {
                userName: action.payload.username,
                isFething: false,
                isLoggedIn: true,
                display: 'none',
            });
        case(FETCH_SESSION_FAILURE):
            return Object.assign({}, state, {
                isFething: false,
                isLoggedIn: false,
                display: 'block',
            });
        default:
            return state;
    }
}
