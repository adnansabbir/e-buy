import React, {useEffect} from "react";
import {Route} from 'react-router-dom';
import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import {connect} from 'react-redux';
import {fetchCollectionsStart} from "../../redux/shop/shop.actions";
import CollectionContainer from "../collection/collection.container";

const ShopPage = ({match, fetchCollectionStart}) => {

    useEffect(() => {
        fetchCollectionStart();
    }, [fetchCollectionStart]);

    return (
        <div className="shop-page">
            <Route exact path={match.path} component={CollectionOverviewContainer}/>
            <Route path={`${match.path}/:collectionId`}
                   component={CollectionContainer}/>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);