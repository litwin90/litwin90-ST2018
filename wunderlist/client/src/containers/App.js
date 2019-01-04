import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import FormSignIn from './FormSignIn';
import FormSignUp from './FormSignUp';
import Header from '../components/Header';
import * as actions from '../actions/actionCreators';
// import fetch from 'isomorphic-fetch';

class App extends Component {
    // componentDidUpdate() {
    //     fetch('http://localhost:4000/auth/profile')
    //     .then(response => response.json())
    //     .then(response => {
    //         // console.log(response);
    //     });
    // }
    render() {
        const isLoggedIn = this.props.registration.isLoggedIn;
        console.log(this.props.registration);
        return (
            <Router>
                <div>
                    <Header 
                        userName={this.props.registration.userName}
                        isLoggedIn={this.props.registration.isLoggedIn}
                        onClick={() => {
                        this.props.dispatch(actions.fetchLogOut());
                        }}
                        registerErr={this.props.registration.registerErr}
                    />
                    <Route exact path="/" component={FormSignUp} />
                    <Route path="/signin" render={() => (
                        isLoggedIn ? (
                            <Redirect to="/"/>
                        ) : (
                            <FormSignIn/>
                        )
                    )}/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

App = connect(mapStateToProps)(App);

export default App;
