import React from "react";

const Input = ({ header, type, name, plaseHolder, onChange, onBlur, error }) => (
    <label><b>{header}</b>
        <input 
            type={type} 
            placeholder={plaseHolder}
            name={name}
            onChange = {onChange}
            onBlur = {onBlur}
            className={(error) ? ('invalid') : ('')}
        />
        <div className="errorContainer" style={{display: (error) ? ('block') : ('none')}}>
            <p className="error">{error}</p>
        </div>
    </label>
);

export default Input;
