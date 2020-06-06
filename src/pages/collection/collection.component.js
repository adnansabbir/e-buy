import React from "react";
import CollectionItem from '../../components/checkout-item/checkout-item.component';
import {connect} from 'react-redux';
import './collection.style.scss';
import {selectCollection} from "../../redux/shop/shop.selector";

const CollectionPage = ({collection}) => {
    console.log(collection);
    return (
        <div className="category-page">
            <h2>CATEGORY PAGE</h2>
        </div>
    )
};

const mapStateToProps = (state, ownProps)=> ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});
export default connect(mapStateToProps)(CollectionPage);