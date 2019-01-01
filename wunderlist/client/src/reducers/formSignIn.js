import initialState from './initialState';
import { CHANGE_NAME_SIGN_IN, CHANGE_PASSWORD, CANSEL_SIGN_IN } from '../actions/actionTypes';
import config from '../config';
const { regexName, regexPsw } = config;

export default function formSignIn(state = initialState.formSignIn, action) {
    switch (action.type) {
        case(CHANGE_NAME_SIGN_IN):
            let nameIsCorrect = regexName.test(action.userName);
            return Object.assign({}, state, {
                userName: action.userName,
                nameIsCorrect,
                nameIsTyped: true,
            });
        case(CHANGE_PASSWORD):
            const pswIsCorrect = regexPsw.test(action.psw);
            let isCorrect = state.nameIsCorrect && pswIsCorrect;
            return Object.assign({}, state, {
                psw: action.psw,
                pswIsCorrect,
                isCorrect,
                pswIsTyped: true,
            });
        case(CANSEL_SIGN_IN):
            return Object.assign({}, initialState.formSignIn);
        default:
            return state;
    }
}
