import React from "react";

const Input = ({ header, type, name, plaseHolder, onChange, onBlur, error, displayState }) => (
    <label><b>{header}</b>
        <input 
            type={type} 
            placeholder={plaseHolder}
            name={name}
            onChange = {onChange}
            onBlur = {onBlur}
            className={(error) ? ('invalid') : ('')}
        />
        <div className="errorContainer" style={{display: displayState}}>
            <p className="error">{error}</p>
        </div>
    </label>
);

export default Input;
