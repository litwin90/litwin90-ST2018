import React from 'react' ;
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import constants from './constants';


let linkHref;
let linkText;

const Header = withRouter(({ userName, isLoggedIn, onClick, registerErr, location }) => {
    const currentLocation = location.pathname;
    if (currentLocation === constants.locations.signin) {
        linkHref = constants.locations.home;
        linkText = constants.linkValues.register;
    } else {
        linkHref = constants.locations.signin;
        linkText = constants.linkValues.login;
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
});

export default Header;
