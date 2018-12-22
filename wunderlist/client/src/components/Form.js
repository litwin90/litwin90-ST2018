import React from 'react';

class Form extends React.Component {
    state = {
        firstName: '',
        firstNameError: '',
        password: '',
        passwordError: '',
        passwordRepeate: '',
        passwordRepeateError: '',
    };

    render() {
        const {
            firstName,
            firstNameError,
            password,
            passwordError,
            passwordRepeate,
            passwordRepeateError,
        } = this.state;
        
        const {
            inputs,
            buttons, 
        } = this.props;
        return (
            <form>
            </form>
        );
    }
}

export default Form;
