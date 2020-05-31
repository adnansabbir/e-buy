import React from 'react';
import {connect} from 'react-redux';
import {Route} from "react-router-dom";
import './App.scss';
import Homepage from "./pages/homepage/homepage.page";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from './redux/user/user.actions'

class App extends React.Component {
    firebaseAuthUnsubscription;

    componentDidMount() {
        const {setCurrentUser} = this.props;
        this.firebaseAuthUnsubscription = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }

    componentWillUnmount() {
        this.firebaseAuthUnsubscription();
    }

    render() {
        return (
            <div>
                <Header/>
                <Route exact={true} path='/' component={Homepage}/>
                <Route exact={true} path='/shop' component={ShopPage}/>
                <Route exact={true} path='/signin' component={SignInAndSignUp}/>
            </div>
        )
    };
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(null, mapDispatchToProps)(App);
