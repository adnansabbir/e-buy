import React from "react";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.style';
import {ReactComponent as Logo} from "../../assets/crow.svg";
import {auth} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../card-dropdown/card-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {selectCartHidden} from "../../redux/cart/cart.selectors";

const Header = ({currentUser, cartDropDownHidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to={'/shop'}>Shop</OptionLink>
            <OptionLink to={'/contact'}>Contact</OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={() => auth.signOut()}>Sign Out</OptionLink>
                    : <OptionLink to={'/signin'}>Sign In</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {cartDropDownHidden ? null : <CartDropDown/>}
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartDropDownHidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);