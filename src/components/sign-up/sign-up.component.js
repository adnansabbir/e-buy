import React from "react";
import './sign-up.style.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {connect} from 'react-redux';
import {signUpStart} from "../../redux/user/user.actions";

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (event) => (this.setState({[event.target.name]: event.target.value}));

    handleSubmit = async (event) => {
        event.preventDefault();
        const {signUpStart} = this.props;
        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert('Password do not match');
            return null
        }

        signUpStart({displayName, email, password});
    };

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return (
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        label='Display Name'
                        value={displayName}
                        onChange={this.handleChange}
                        required
                    />

                    <FormInput
                        type='email'
                        name='email'
                        label='Email'
                        value={email}
                        onChange={this.handleChange}
                        required
                    />

                    <FormInput
                        type='password'
                        name='password'
                        label='Password'
                        value={password}
                        onChange={this.handleChange}
                        required
                    />

                    <FormInput
                        type='password'
                        name='confirmPassword'
                        label='Confirm Password'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);