import initialState from './initialState';
import { CHANGE_NAME_SIGN_UP, CHANGE_PSW1, CHANGE_PSW2, CANSEL_SIGN_UP } from '../actions/actionTypes';
import config from '../config';
const { regexName, regexPsw } = config;

export default function formSignUp(state = initialState.formSignUp, action) {
    switch (action.type) {
        case(CHANGE_NAME_SIGN_UP):
            const nameIsCorrect = regexName.test(action.userName);
            return Object.assign({}, state, {
                userName: action.userName,
                nameIsCorrect,
                nameIsTyped: true,
            });
        case(CHANGE_PSW1):
            const psw1IsCorrect = regexPsw.test(action.psw1);
            return Object.assign({}, state, {
                psw1: action.psw1,
                psw1IsCorrect,
                psw1IsTyped: true,
            });
        case(CHANGE_PSW2):
            const psw2IsCorrect = regexPsw.test(action.psw2);
            const passwordsMatch = state.psw1 === action.psw2;
            const isCorrect = passwordsMatch && state.nameIsCorrect;
            return Object.assign({}, state, {
                psw2: action.psw2,
                psw2IsCorrect,
                psw2IsTyped: true,
                isCorrect,
            });
        case(CANSEL_SIGN_UP):
            return Object.assign({}, initialState.formSignUp);
        default:
            return state;
    }
}
