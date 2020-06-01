import React from "react";
import {Link} from "react-router-dom";
import './header.style.scss';
import {ReactComponent as Logo} from "../../assets/crow.svg";
import {auth} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../card-dropdown/card-dropdown.component";

const Header = ({currentUser, cartDropDownHidden}) => (
    <div className="header">
        <Link className='logo-container' to="/">
            <Logo className='logo'/>
        </Link>
        <div className="options">
            <Link className='option' to={'/shop'}>Shop</Link>
            <Link className='option' to={'/contact'}>Contact</Link>
            {
                currentUser ?
                    <Link className='option' to={'/'} onClick={() => auth.signOut()}>Sign Out</Link>
                    : <Link className='option' to={'/signin'}>Sign In</Link>
            }
            <CartIcon/>
        </div>
        {cartDropDownHidden ? null : <CartDropDown/>}
    </div>
);

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser: currentUser,
    cartDropDownHidden: hidden
});

export default connect(mapStateToProps)(Header);