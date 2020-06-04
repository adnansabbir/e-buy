import React from "react";
import {connect} from 'react-redux'
import './checkout-item.style.scss';
import {clearItemFromCart} from "../../redux/cart/cart.actions";

const CheckoutItem = ({cartItem, clearItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <div className="name">{name}</div>
            <div className="quantity">{quantity}</div>
            <div className="price">{price}</div>
            <div className="remove-button" onClick={() => clearItem(cartItem)}>&#10005;</div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    clearItem: cartItem => dispatch(clearItemFromCart(cartItem))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);