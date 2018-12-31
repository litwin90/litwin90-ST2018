import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import FormSignIn from '../containers/FormSignIn';
import FormSignUp from '../containers/FormSignUp';
import mainReducer from '../reducers/mainReducer';


let store = createStore(mainReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route exact path="/" component={FormSignUp} />
                        <Route path="/signin" component={FormSignIn} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
