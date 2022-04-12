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

    state = {
        selectedWaiver: null,
    };

    onSelectWaiver = waiver => {
        if (this.state.selectedWaiver === waiver.id) {
            this.setState({ selectedWaiver: null });
        } else {
            this.setState({ selectedWaiver: waiver.id });
        }
    };

    render() {
        const { orders, experiences } = this.props;
        return (
            <>
                <Header back={true} steps={['Search', 'Select Reservation', 'Sign Waiver']} currentStep={2} />
                <Layout>
                    <WaiverExperienceList
                        onSignWaiver={this.handleSignWaiver}
                        orders={orders}
                        experiences={experiences}
                        onSelectWaiver={this.onSelectWaiver}
                        selectedWaiver={this.state.selectedWaiver}
                    />
                </Layout>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectWaiver);
