import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

let Header = ({ userName, isLoggedIn, onClick, registerErr, location }) => {
    const currentLocation = location.pathname;
    let linkHref;
    let linkText;
    if (currentLocation === '/signin') {
        linkHref = '/';
        linkText = 'Register';
    } else {
        linkHref = '/signin';
        linkText = 'Login';
    }
    if (!isLoggedIn) {
        return (
            <header className="topnav">
                <Link to={linkHref}>{linkText}</Link>
                <p>{ registerErr }</p>
            </header>
        )
    } else {
        return (
            <header className="topnav">
                <button onClick={onClick}>Log out</button>
                <p>{ userName }</p>
            </header>
        )
    }
};

Header = withRouter(Header);

export default Header;
