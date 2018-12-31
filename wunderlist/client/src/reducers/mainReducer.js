import {
    CHANGE_NAME_SIGN_IN,
    CHANGE_NAME_SIGN_UP,

    CHANGE_PASSWORD,
    CHANGE_PSW1,
    CHANGE_PSW2,

    REGISTER,
    LOGIN,
} from '../actions/actionTypes';

import config from '../config';
const { regexName, regexPsw } = config;

const initialState = {
    formSignUp: {
        userName: undefined,
        psw1: undefined,
        psw2: undefined,
        
        nameIsCorrect: true,
        psw1IsCorrect: true,
        psw2IsCorrect: true,
    
        isCorrect: true,
    },
    formSignIn: {
        userName: undefined,
        psw: undefined,

        nameIsCorrect: true,
        pswIsCorrect: true,

        isCorrect: true,
    },
    registration: {
        userName: undefined,
        isLoggedIn: false,
        isRegistred: false,
    },
}

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case(CHANGE_NAME_SIGN_IN):
            let nameIsCorrect = regexName.test(action.userName);
            return Object.assign({}, state, {
                formSignIn: Object.assign({}, state.formSignIn, {
                    userName: action.userName,
                    nameIsCorrect,
                }),
            });
        case(CHANGE_NAME_SIGN_UP):
            nameIsCorrect = regexName.test(action.userName);
            return Object.assign({}, state, {
                formSignUp: Object.assign({}, state.formSignUp, {
                    userName: action.userName,
                    nameIsCorrect,
                }),
            });
        case(CHANGE_PASSWORD):
            const pswIsCorrect = regexPsw.test(action.psw);
            let isCorrect = state.formSignIn.nameIsCorrect && pswIsCorrect;
            return Object.assign({}, state, {
                formSignIn: Object.assign({}, state.formSignIn, {
                    psw: action.psw,
                    pswIsCorrect,
                    isCorrect,
                }),
            });
        case(CHANGE_PSW1):
            const psw1IsCorrect = regexPsw.test(action.psw1);
            return Object.assign({}, state, {
                formSignUp: Object.assign({}, state.formSignUp, {
                    psw1: action.psw1,
                    psw1IsCorrect,
                }),
            });
        case(CHANGE_PSW2):
            const psw2IsCorrect = regexPsw.test(action.psw2);
            const passwordsMatch = state.formSignUp.psw1 === action.psw2;
            isCorrect = passwordsMatch && state.formSignUp.nameIsCorrect;
            return Object.assign({}, state, {
                formSignUp: Object.assign({}, state.formSignUp, {
                    psw2: action.psw2,
                    psw2IsCorrect,
                    isCorrect,
                }),
            });
        case(REGISTER):
            // register logic
            console.log('register');
            return state;
        case(LOGIN):
            console.log('login');
            // login logic
            return state;
        default:
            return state;
    }
}
