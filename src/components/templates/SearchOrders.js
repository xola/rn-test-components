import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { searchOrders, showEmptySearchResult } from '../../actions/orderActions';
import SearchPage from './SearchPage';
import NavigationService from '../NavigationService';

class SearchOrders extends Component {
    handleSearchClick = async params => {
        await this.props.searchOrders(params.searchText, this.props.seller.id);

        if (_.size(this.props.orders) > 0) {
            NavigationService.navigate('SelectOrder');
        } else {
            this.props.showEmptySearchResult();
        }
    };

    render() {
        return <SearchPage type="checkIn" title={'Find your reservation to check in'} onSearchClick={this.handleSearchClick} />;
    }
}

const mapStateToProps = state => ({
    orders: state.order.collection,
    seller: state.auth.seller
});

const mapDispatchToProps = {
    searchOrders,
    showEmptySearchResult,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchOrders);
