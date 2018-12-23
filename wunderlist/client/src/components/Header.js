import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
    <ul>
        <li>
            <Link to="/">Register</Link>
        </li>
        <li>
            <Link to="/signin">Login</Link>
        </li>
    </ul>
);

export default Header;
