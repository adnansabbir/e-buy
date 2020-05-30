import React from 'react';
import './App.scss';
import Homepage from "./pages/homepage/homepage.page";
import {Route} from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";

class App extends React.Component {
    firebaseAuthUnsubscription;

    constructor() {
        super();
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        this.firebaseAuthUnsubscription = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    });
                });
            } else {
                this.setState({currentUser: null});
            }
        });
    }

    componentWillUnmount() {
        this.firebaseAuthUnsubscription();
    }

    render() {
        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Route exact={true} path='/' component={Homepage}/>
                <Route exact={true} path='/shop' component={ShopPage}/>
                <Route exact={true} path='/signin' component={SignInAndSignUp}/>
            </div>
        )
    };
}

export default App;