import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51GrXcUEgQvi6VOszJH7n5ixtcNzeSGSuKVMDJn5dErE20vV7gzBVkpCDjWDtK6ORg75gj09joB5cDfQ9ByPxlvxc00Rn9QZh1B';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful');
        }).catch(error => {
            console.log(error);
            alert('Error in payment, please sure to use test credit card');
        });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            image='https://svgshare.com/i/CUz.svg'
            token={onToken}
            stripeKey={publishableKey}/>
    )
};

export default StripeCheckoutButton;
