import React from "react";
import './collection-item.style.scss'
import {connect} from "react-redux";
import {addItem} from '../../redux/cart/cart.actions';
import CustomButton from "../custom-button/custom-button.component";

const CollectionItem = ({item, addItemToCart}) => {
    const {name, price, imageUrl} = item;
    return (
        <div className="collection-item">
            <div className="image" style={{backgroundImage: `url(${imageUrl})`}}/>
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton
                extraClassNames='inverted'
                onClick={() => addItemToCart(item)}
            >ADD TO CART</CustomButton>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    addItemToCart: (item) => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);