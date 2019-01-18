import React from "react";

const Todo = ({ className, content, innerElement, onClick }) => (
    <div className={className}>
        {innerElement}
        <p>{content}</p>
        <input type="checkbox" onClick={onClick}></input>
    </div>
);

export default Todo;
