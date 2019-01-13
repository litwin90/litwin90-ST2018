import { CHANGE_NAME_SIGN_UP, CHANGE_PSW1, CHANGE_PSW2, CANCEL_SIGN_UP } from '../actions/actionTypes';
import config from '../config';
const { regexName, regexPsw } = config;

const formSignUpState = {
    userName: undefined,
    psw1: undefined,
    psw2: undefined,
    
    nameIsCorrect: false,
    psw1IsCorrect: false,
    psw2IsCorrect: false,

    nameIsTyped: false,
    psw1IsTyped: false,
    psw2IsTyped: false,

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
        case(CHANGE_PSW1):
            const psw1IsCorrect = regexPsw.test(action.payload);
            return Object.assign({}, state, {
                psw1: action.payload,
                psw1IsCorrect,
                psw1IsTyped: true,
            });
        case(CHANGE_PSW2):
            const psw2IsCorrect = regexPsw.test(action.payload);
            const passwordsMatch = state.psw1 === action.payload;
            const isCorrect = passwordsMatch && state.nameIsCorrect;
            return Object.assign({}, state, {
                psw2: action.payload,
                psw2IsCorrect,
                psw2IsTyped: true,
                isCorrect,
            });
        case(CANCEL_SIGN_UP):
            return Object.assign({}, formSignUpState);
        default:
            return state;
    }
}
