import React from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import './collections-overview.style.scss';
import CollectionPreview from "../collection-preview/collection-preview.component";
import {selectShopCollections} from "../../redux/shop/shop.selector";

const CollectionOverview = ({collections}) => (
    <div className="collections-overview">
        {collections.map(({id, ...otherData}) => (
            <CollectionPreview key={id} {...otherData}/>
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollections
});

export default connect(mapStateToProps)(CollectionOverview);
