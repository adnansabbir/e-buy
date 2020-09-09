import React, {useState} from "react";
import './sign-up.style.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {connect} from 'react-redux';
import {signUpStart} from "../../redux/user/user.actions";

const SignUp = ({signUpStart}) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (event) => (setUserCredentials({...userCredentials, [event.target.name]: event.target.value}));

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = userCredentials;
        if (password !== confirmPassword) {
            alert('Password do not match');
            return null
        }

        signUpStart({displayName, email, password});
    };

    return (
        <div className="sign-up">
            <h2 className="title">I do not have a account</h2>
            <span>Sign up with your email and password</span>

            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    label='Display Name'
                    value={userCredentials.displayName}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    type='email'
                    name='email'
                    label='Email'
                    value={userCredentials.email}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    type='password'
                    name='password'
                    label='Password'
                    value={userCredentials.password}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    type='password'
                    name='confirmPassword'
                    label='Confirm Password'
                    value={userCredentials.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    );

    // render() {
    //     const {displayName, email, password, confirmPassword} = this.state;
    // }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);