import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {Route, Redirect, Switch} from "react-router-dom";
import './App.scss';
import Homepage from "./pages/homepage/homepage.page";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import {selectCurrentUser} from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.component";
import {checkUsersSession} from "./redux/user/user.actions";

const App = ({checkUsersSession, currentUser}) => {
    useEffect(() => {
        checkUsersSession();
    }, [checkUsersSession]);

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={Homepage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route exact path='/signin' render={() =>
                    currentUser ?
                        (<Redirect to='/'/>) :
                        (<SignInAndSignUp/>)
                }/>
            </Switch>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    checkUsersSession: () => dispatch(checkUsersSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);