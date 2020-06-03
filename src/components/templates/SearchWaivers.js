import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { searchOrders, showEmptySearchResult } from '../../actions/orderActions';
import SearchPage from './SearchPage';
import NavigationService from '../NavigationService';

class SearchWaivers extends Component {
    handleSearchClick = async params => {
        await this.props.searchOrders(params.searchText);
        if (_.size(this.props.orders) > 0) {
            NavigationService.navigate('SelectWaiver');
        } else {
            this.props.showEmptySearchResult();
        }
    };

    render() {
        return <SearchPage title={'Find your reservation to sign waiver'} onSearchClick={this.handleSearchClick} />;
    }
}

const mapStateToProps = state => ({
    orders: state.order.collection,
});

const mapDispatchToProps = {
    searchOrders,
    showEmptySearchResult,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchWaivers);
