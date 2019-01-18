import React from "react";

const FaElement = ({ className, faClassName, onClick }) => (
    <div className={className} onClick={onClick}>
        <i className ={faClassName} aria-hidden="true"></i>
    </div>
);

export default FaElement;
