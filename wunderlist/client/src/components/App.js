import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import FormSignIn from './FormSignIn';
import FormSignUp from './FormSignUp';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={FormSignUp} />
                    <Route path="/signin" component={FormSignIn} />
                </div>
            </Router>
        );
    }
}

export default App;
