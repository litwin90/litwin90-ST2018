const initialState = {
    formSignUp: {
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
    },
    formSignIn: {
        userName: undefined,
        psw: undefined,

        nameIsCorrect: false,
        pswIsCorrect: false,

        nameIsTyped: false,
        pswIsTyped: false,

        isCorrect: false,
    },
    registration: {
        userName: undefined,
        isLoggedIn: false,
        isFething: false,
        registerErr: undefined,
    },
}

export default initialState;
