import { combineReducers } from 'redux';
import formSignIn from './formSignIn';
import formSignUp from './formSignUp';

const mainReducer = combineReducers({
    formSignIn,
    formSignUp,
});

export default mainReducer;
