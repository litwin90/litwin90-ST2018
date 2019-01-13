import { combineReducers } from 'redux';
import formSignIn from './formSignIn';
import formSignUp from './formSignUp';
import registration from './registration';

const mainReducer = combineReducers({
    formSignIn,
    formSignUp,
    registration,
});

export default mainReducer;
