import React, {useState} from "react";
import {connect} from "react-redux";
import './sign-in.style.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {googleSignInStart, emailSignInStart} from "../../redux/user/user.actions";

const SignIn = ({googleSignInStart, emailSignInStart}) => {

    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});

    const handleSubmit = async (event) => {
        event.preventDefault();
        emailSignInStart(userCredentials)
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    };

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type="email"
                    name='email'
                    value={userCredentials.email}
                    handleChange={handleChange}
                    required/>
                <FormInput
                    label='Password'
                    type="password"
                    name='password'
                    value={userCredentials.password}
                    handleChange={handleChange}
                    required/>

                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton
                        onClick={googleSignInStart}
                        googleSignIn
                        type='button'>
                        Sign In With Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (userCredentials) => dispatch(emailSignInStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignIn);