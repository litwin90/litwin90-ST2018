import React from "react";

// props
const FormControl = ({ type, value, className }) => (
    <button type={type} className={className}>{value}</button>
);

export default FormControl;
