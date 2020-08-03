import React from "react";
import {Route} from 'react-router-dom';
import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import {connect} from 'react-redux';
import {fetchCollectionStartAsync} from "../../redux/shop/shop.actions";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../redux/shop/shop.selector';
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {
        const {fetchCollectionStartAsync} = this.props;
        fetchCollectionStartAsync();
    }

    render() {
        const {match, isCollectionLoaded} = this.props;

        return (
            <div className="shop-page">
                <Route exact path={match.path}
                       render={(props) => <CollectionOverviewWithSpinner
                           isLoading={!isCollectionLoaded} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>}/>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);