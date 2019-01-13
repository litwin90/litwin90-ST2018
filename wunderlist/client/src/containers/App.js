import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import FormSignIn from './FormSignIn';
import FormSignUp from './FormSignUp';
import Header from '../components/Header';
import * as actions from '../actions/actionCreators';

class App extends Component {
    render() {
        const { userName, isLoggedIn, registerErr } = this.props;
        
        return (
            <Router>
                <div>
                    <Header 
                        userName={userName}
                        isLoggedIn={isLoggedIn}
                        onClick={this.logOut.bind(this)}
                        registerErr={registerErr}
                    />
                    <Route exact path="/" component={FormSignUp} />
                    <Route path="/signin" render={this.displayForm.bind(this)}/>
                </div>
            </Router>
        );
    }
    displayForm() {
        const { isLoggedIn } = this.props;
        return isLoggedIn ? (<Redirect to="/"/>) : (<FormSignIn/>);
    }
    logOut() {
        const { logOut } = this.props.pageActions;
        logOut();
    }
    componentDidMount() {
        const { getSession } = this.props.pageActions;
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            getSession();
        }
    }
}

const mapStateToProps = (state) => {
    return { 
        isLoggedIn: state.registration.isLoggedIn,
        userName:  state.registration.userName,
        registerErr: state.registration.registerErr,
    };
}

const mapActionsToProp = (dispatch) => {
    return {
        pageActions: bindActionCreators({ logOut: actions.logOut, getSession: actions.getSession }, dispatch)
    }
}

App = connect(mapStateToProps, mapActionsToProp)(App);

export default App;
