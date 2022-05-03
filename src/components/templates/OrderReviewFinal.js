import { submitOrder, commitOrder, releaseOrder, updateCustomer } from '../../actions/orderActions';
import { TouchableOpacity, View, Text } from 'react-native';
import { startPaymentCollection, openModal, closeModal } from '../../actions/paymentActions';
import StripePaymentModal from '../../modals/StripePaymentModal';
import StripeTerminal from 'crowdbotics-react-native-stripe-terminal';
import OrderSummary from '../common/OrderSummary';
import React, { Component } from 'react';
import styles from './OrderReviewStyle';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import _ from 'lodash';
import headerStyles from '../common/HeaderStyle'
import variables from '../../styles/variables';
import Currency from '../common/Currency';
import NavigationService from '../NavigationService';

class OrderReviewFinal extends Component {
    handlePayClick = async params => {
        if (this.props.cart.submittedOrder.paymentIntents[0]) {
            this.props.openModal();
        }
    };

    handleCancelModal = async () => {
        await StripeTerminal.abortCreatePayment();
        await this.props.releaseOrder();
        this.props.closeModal();
        NavigationService.navigate('Home')
    };

    handleGoBack = async () => {
        await StripeTerminal.abortCreatePayment();
        this.props.closeModal();
    };

    handleRetry = async () => {
        this.props.closeModal();
        await StripeTerminal.abortCreatePayment();
        this.props.openModal();
    };

    handleCommit = async () => {
        await this.props.commitOrder();
        this.props.closeModal();
    };

    handleEndEditing = ({ customerName, customerEmail, phone }) => () => {
        this.props.updateCustomer({ customerName, customerEmail, phone });
    };

    render() {
        const { experience, device } = this.props;
        const { amount, partnerFee } = this.props.cart.preparedOrder;
        let total = amount;
        if (partnerFee && !partnerFee.orderAmountIncludesPartnerFee) {
            total += partnerFee.amount;
        }

        return (
            <>
                <Header
                    back={true}
                    right={() => true ? <TouchableOpacity onPress={this.handlePayClick} style={[headerStyles.next, { backgroundColor: variables.green }]}>
                        <View style={styles.row}>
                            <Text style={headerStyles.nextText}>{'Pay'}</Text>
                            <Text style={[headerStyles.nextText, { paddingRight: 0 }]}><Currency>{total}</Currency></Text>
                        </View>
                    </TouchableOpacity> : <View />}
                    steps={["Product", "Time", "Quantity", "Info", "Pay"]}
                    currentStep={5}
                />
                <Layout
                    modals={
                        this.props.payment.isOpen ? (
                            <StripePaymentModal
                                onClose={this.handleCancelModal}
                                onRetry={this.handleRetry}
                                onCommit={this.handleCommit}
                                onGoBack={this.handleGoBack}
                                onPaymentCollect={this.props.startPaymentCollection}
                                order={this.props.cart.order}
                                payment={this.props.payment}
                                device={device}
                                total={total}
                            />
                        ) : null
                    }
                >

                    <Text style={styles.title}>
                        Review Purchase
                    </Text>
                    <View style={styles.info}>
                        <OrderSummary
                            cart={this.props.cart}
                            itemIndex={this.props.cart.itemIndex}
                            experience={experience}
                        />
                    </View>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    experience: state.experiences.collection[state.cart.order.items[state.cart.itemIndex].experience.id],
    item: state.cart.preparedOrder.items[state.cart.itemIndex],
    device: state.readers.computer.label,
    payment: state.payment,
});

const mapDispatchToProps = {
    submitOrder,
    commitOrder,
    releaseOrder,
    startPaymentCollection,
    openModal,
    closeModal,
    updateCustomer,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderReviewFinal);
