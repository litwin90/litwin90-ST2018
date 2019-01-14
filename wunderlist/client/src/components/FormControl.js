import React from "react";

const FormControl = ({ type, value, className, onClick }) => (
    <button type={type} className={className} onClick={onClick}>{value}</button>
);

export default FormControl;
