import React, { Component }  from "react";

class Control extends Component {
    state = { active: false }
    toggleActive = () => {
        this.setState( this.state.active ? { active: false} : { active: true } );
    }
    render() {
        const { type, className, onClick, value, innerElement } =this.props;
        const { active } = this.state;
        const calculatedClass = active ? (className + ' active') : (className);
        const listener = onClick ? onClick : this.toggleActive; 
        return (
            <button type={type} className={calculatedClass} onClick={listener}>{value}
                {innerElement}
            </button>
        )
    }
} 

export default Control;
