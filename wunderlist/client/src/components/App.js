import React, { Component } from 'react';
// import '../css/App.css';
import Input from './Input';
import FormControl from './FormControl';

class App extends Component {
  render() {
    return (
        <form className="App register-form">
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>
                <Input 
                    header="User Name" 
                    type="text" 
                    name="username"
                    plaseHolder="Enter user name"    
                ></Input>
                <Input header="Password" 
                    type="password" 
                    name="password"
                    plaseHolder="Enter password"
                ></Input>
                <Input header="Repeat Password" 
                    type="password" 
                    name="passwordRepeat"
                    plaseHolder="Repeat password"
                ></Input>
                <hr/>
            </div>
            <div className="container signin">
                <div className="git-hub"></div>
                <p>By creating an account you agree to our <a href="/">Terms & Privacy</a>.</p>
                <FormControl type="submit" value="Register" className="registerbtn"></FormControl>
                <p>Already have an account? <a href="/">Sign in</a>.</p>
            </div>
        </form>
    );
  }
}

export default App;
