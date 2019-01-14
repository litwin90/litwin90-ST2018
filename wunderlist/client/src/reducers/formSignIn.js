import { CHANGE_NAME_SIGN_IN, CHANGE_PASSWORD, CANCEL_SIGN_IN } from '../actions/actionTypes';
import config from '../config';
const { regexName, regexPassword } = config;

const formSignInState =  {
    userName: undefined,
    password: undefined,

    nameIsCorrect: false,
    passwordIsCorrect: false,

    nameIsTyped: false,
    passwordIsTyped: false,

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
            const passwordIsCorrect = regexPassword.test(action.payload);
            let isCorrect = state.nameIsCorrect && passwordIsCorrect;
            return Object.assign({}, state, {
                password: action.payload,
                passwordIsCorrect,
                isCorrect,
                passwordIsTyped: true,
            });
        case(CANCEL_SIGN_IN):
            return Object.assign({}, formSignInState);
        default:
            return state;
    }
}
