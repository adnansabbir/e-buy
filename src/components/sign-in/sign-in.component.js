import React from "react";
import {connect} from "react-redux";
import './sign-in.style.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth} from "../../firebase/firebase.utils";
import {googleSignInStart} from "../../redux/user/user.actions";

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (e) {
            console.log(e);
        }
    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {googleSignInStart} = this.props;
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label='Email'
                        type="email"
                        name='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required/>
                    <FormInput
                        label='Password'
                        type="password"
                        name='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
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
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);