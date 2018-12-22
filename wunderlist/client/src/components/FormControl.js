import React from "react";

// props
const FormControl = ({ type, value }) => (
    <button type={type} className="registerbtn">{value}</button>
);

export default FormControl;
