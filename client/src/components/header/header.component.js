import React from "react";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.style';
import {ReactComponent as Logo} from "../../assets/crow.svg";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../card-dropdown/card-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {signOutStart} from "../../redux/user/user.actions";

const Header = ({currentUser, cartDropDownHidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to={'/shop'}>Shop</OptionLink>
            <OptionLink to={'/contact'}>Contact</OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={() => signOutStart()}>Sign Out</OptionLink>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
