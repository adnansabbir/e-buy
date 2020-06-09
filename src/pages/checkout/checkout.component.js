import React from "react";
import './checkout.style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-checkout-button/stripe-checkout-button.component";

const getExpDateForDummyCard = () => {
    const date = new Date();
    date.setMonth(0);
    date.setFullYear(date.getFullYear() + 1);
    return date;
};

const CheckoutPage = ({cartItems, totalPrice}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>

            <div className="header-block">
                <span>Description</span>
            </div>

            <div className="header-block">
                <span>Quantity</span>
            </div>

            <div className="header-block">
                <span>Price</span>
            </div>

            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>

        {
            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
        }
        <div className="total">
            <span>TOTAL: ${totalPrice}</span>
        </div>
        <div className="text-warning">
            *Please use the following dummy credit card for payment*
            <br/>
            4242 4242 4242 4242 - Exp {getExpDateForDummyCard().getMonth() + 1} / {getExpDateForDummyCard().getFullYear()} - CVV: 123
        </div>
        <StripeCheckoutButton price={totalPrice}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalPrice: selectCartTotal
});
export default connect(mapStateToProps)(CheckoutPage);