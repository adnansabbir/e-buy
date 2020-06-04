import React from "react";
import {connect} from 'react-redux';
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import {createStructuredSelector} from "reselect";
import {selectShopCollections} from "../../redux/shop/shop.selector";

const ShopPage = ({collections}) => (
    <div className="shop-page">
        {collections.map(({id, ...otherData}) => (
            <CollectionPreview key={id} {...otherData}/>
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
});

export default connect(mapStateToProps)(ShopPage);