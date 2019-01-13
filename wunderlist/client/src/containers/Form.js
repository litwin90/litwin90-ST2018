import React, { Component } from 'react';
import Input from '../components/Input';
import FormControl from '../components/FormControl';

class Form extends Component {
    render(){
        const 
        {
            className,
            onSubmit,
            displayState,
            header,
            description,
            inputs,
            gitUrl,
            googleUrl,
            cancel,
            submit,
        } = this.props;
        return (
            <form
                className={className}
                onSubmit={onSubmit}
                style={{display: displayState}}
            >
                <div className="container">
                    <h1>{header}</h1>
                    <p>{description}</p>
                    <hr/>
                    {this.renderInputs(inputs)}
                    <hr/>
                </div>
                <div className="container controls">
                    <a href={gitUrl}><div className="git-hub"></div></a>
                    <a href={googleUrl}><div className="google"></div></a>
                    <FormControl
                        type="submit"
                        value={submit.text}
                        className={submit.className}
                    >
                    </FormControl>
                    <FormControl
                        type="reset"
                        value="Cancel" 
                        className="cancelbtn"
                        onClick={cancel}
                    >
                    </FormControl>
                </div>
            </form>
        );
    }
    renderInputs(inputsData) {
        const inputs = [];
        
        inputsData.forEach((input, index) => {
            inputs.push(
                <Input
                    header={input.header}
                    type={input.type}
                    name={input.name}
                    plaseHolder={input.plaseHolder}
                    onChange={input.onChange}
                    error={input.error}
                    key={index}
                    displayState={(input.error) ? 'block' : 'none'}
                ></Input>
            );
        });

        return inputs;
    }
}

export default Form;
