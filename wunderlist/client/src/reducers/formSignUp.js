import { CHANGE_NAME_SIGN_UP, CHANGE_PASSWORD_1, CHANGE_PASSWORD_2, CANCEL_SIGN_UP } from '../actions/actionTypes';
import config from '../config';
const { regexName, regexPassword } = config;

const formSignUpState = {
    userName: undefined,
    password1: undefined,
    password2: undefined,
    
    nameIsCorrect: false,
    password1IsCorrect: false,
    password2IsCorrect: false,

    nameIsTyped: false,
    password1IsTyped: false,
    password2IsTyped: false,

    isCorrect: false,
}

export default function formSignUp(state = formSignUpState, action) {
    switch (action.type) {
        case(CHANGE_NAME_SIGN_UP):
            const nameIsCorrect = regexName.test(action.payload);
            return Object.assign({}, state, {
                userName: action.payload,
                nameIsCorrect,
                nameIsTyped: true,
            });
        case(CHANGE_PASSWORD_1):
            const password1IsCorrect = regexPassword.test(action.payload);
            return Object.assign({}, state, {
                password1: action.payload,
                password1IsCorrect,
                password1IsTyped: true,
            });
        case(CHANGE_PASSWORD_2):
            const password2IsCorrect = regexPassword.test(action.payload);
            const passwordsMatch = state.password1 === action.payload;
            const isCorrect = passwordsMatch && state.nameIsCorrect;
            return Object.assign({}, state, {
                password2: action.payload,
                password2IsCorrect,
                password2IsTyped: true,
                isCorrect,
            });
        case(CANCEL_SIGN_UP):
            return Object.assign({}, formSignUpState);
        default:
            return state;
    }
}
