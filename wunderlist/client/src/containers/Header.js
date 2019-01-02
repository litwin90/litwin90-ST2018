import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';

let Header = ({ userName, isLoggedIn, dispatch, registerErr }) => {
    if (!isLoggedIn) {
        return (
            <header className="topnav">
                <Link to="/signin">Login</Link>
                <p>{ registerErr }</p>
            </header>
        )
    } else {
        return (
            <header className="topnav">
                <button onClick={() => {
                    dispatch(actions.fetchLogOut());
                }}>Log out</button>
                <p>{ userName }</p>
            </header>
        )
    }
};

const mapStateToProps = ({ registration }) => {
    return registration;
}

Header = connect(mapStateToProps)(Header);

export default Header;
