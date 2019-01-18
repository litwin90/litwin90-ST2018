import { combineReducers } from 'redux';
import formSignIn from './formSignIn';
import formSignUp from './formSignUp';
import registration from './registration';
import currentAccount from './currentAccount';

const mainReducer = combineReducers({
    formSignIn,
    formSignUp,
    registration,
    currentAccount,
});

export default mainReducer;
