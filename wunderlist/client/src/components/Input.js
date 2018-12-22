import React from "react";

// props
const Input = ({ header, type, name, plaseHolder }) => (
    <label><b>{header}</b>
        <input 
            type={type} 
            placeholder={plaseHolder}
            name={name}
        />
    </label>
);

export default Input;
