import { CHANGE_NAME_SIGN_IN, CHANGE_PASSWORD, CANCEL_SIGN_IN } from '../actions/actionTypes';
import config from '../config';
const { regexName, regexPsw } = config;

const formSignInState =  {
    userName: undefined,
    psw: undefined,

    nameIsCorrect: false,
    pswIsCorrect: false,

    nameIsTyped: false,
    pswIsTyped: false,

    isCorrect: false,
}

export default function formSignIn(state = formSignInState, action) {
    switch (action.type) {
        case(CHANGE_NAME_SIGN_IN):
            let nameIsCorrect = regexName.test(action.payload);
            return Object.assign({}, state, {
                userName: action.payload,
                nameIsCorrect,
                nameIsTyped: true,
            });
        case(CHANGE_PASSWORD):
            const pswIsCorrect = regexPsw.test(action.payload);
            let isCorrect = state.nameIsCorrect && pswIsCorrect;
            return Object.assign({}, state, {
                psw: action.payload,
                pswIsCorrect,
                isCorrect,
                pswIsTyped: true,
            });
        case(CANCEL_SIGN_IN):
            return Object.assign({}, formSignInState);
        default:
            return state;
    }
}
