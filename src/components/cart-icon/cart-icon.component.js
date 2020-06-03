import React from "react";
import './cart-icon.style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {ReactComponent as ShoppingCart} from "../../assets/shopping-cart.svg";
import {selectCartItemCount} from "../../redux/cart/cart.selectors";

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingCart className='shopping-icon'/>
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemCount
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);