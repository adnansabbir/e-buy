import React, {memo} from "react";
import './cart-item.style.scss';

class CartItem extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return JSON.stringify(this.props.item) !== JSON.stringify(nextProps.item);
    }

    render() {
        const {item: {imageUrl, price, name, quantity}} = this.props;
        return (
            <div className="cart-item">
                <img src={imageUrl} alt={name}/>
                <div className="item-details">
                    <span className="name">{name}</span>
                    <span className="price">{quantity} x ${price}</span>
                </div>
            </div>
        )
    }
}

export default CartItem;
