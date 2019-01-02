import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import FormSignIn from '../containers/FormSignIn';
import FormSignUp from '../containers/FormSignUp';
import mainReducer from '../reducers/mainReducer';
import Header from '../containers/Header';

// const loggerMiddleware = createLogger();

let store = createStore(
    mainReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

store.subscribe(() => {
    console.log(store.getState());
})

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Header/>
                        <Route exact path="/" component={FormSignUp} />
                        <Route path="/signin" component={FormSignIn} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
