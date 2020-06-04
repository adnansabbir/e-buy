import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {withRouter} from 'react-router-dom';
import './card-dropdown.style.scss';
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const CartDropDown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                    cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem}/>))
                    : (<span className='empty-message'>No item in cart</span>)
            }
        </div>
        <CustomButton onClick={() => {
            dispatch(toggleCartHidden());
            history.push('/checkout');
        }}>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropDown))