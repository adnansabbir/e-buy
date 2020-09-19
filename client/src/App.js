import React, {useEffect, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {Route, Redirect, Switch} from "react-router-dom";
import './App.scss';

import {selectCurrentUser} from "./redux/user/user.selector";
import {checkUsersSession} from "./redux/user/user.actions";

import Header from "./components/header/header.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Spinner from "./components/spinner/spinner.component";

const Homepage = lazy(() => import("./pages/homepage/homepage.page"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUp = lazy(() => import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"));

const App = ({checkUsersSession, currentUser}) => {
    useEffect(() => {
        checkUsersSession();
    }, [checkUsersSession]);

    return (
        <div>
            <Header/>
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner/>}>
                        <Route exact path='/' component={Homepage}/>
                        <Route path='/shop' component={ShopPage}/>
                        <Route exact path='/checkout' component={CheckoutPage}/>
                        <Route exact path='/signin' render={() =>
                            currentUser ?
                                (<Redirect to='/'/>) :
                                (<SignInAndSignUp/>)
                        }/>
                    </Suspense>
                </ErrorBoundary>
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
