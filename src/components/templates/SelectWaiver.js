import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import { selectOrderItem } from '../../actions/orderActions';
import Header from '../common/Header';
import WaiverExperienceList from './WaiverExperienceList';
import NavigationService from '../NavigationService';

class SelectWaiver extends Component {
    handleSignWaiver = (order, item) => {
        this.props.selectOrderItem(order.id, item.id);
        NavigationService.navigate('SignInWaiver');
    };

    render() {
        const { orders, experiences } = this.props;
        return (
            <Layout header={<Header title={'Select Reservation'} back={'SearchWaivers'} />}>
                <WaiverExperienceList onSignWaiver={this.handleSignWaiver} orders={orders} experiences={experiences} />
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    orders: state.order.collection,
    experiences: state.experiences.collection,
});

const mapDispatchToProps = {
    selectOrderItem,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectWaiver);
