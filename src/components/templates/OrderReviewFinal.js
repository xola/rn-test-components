import { submitOrder, commitOrder, releaseOrder, updateCustomer } from '../../actions/orderActions';
import { TouchableOpacity } from 'react-native';
import { startPaymentCollection, openModal, closeModal } from '../../actions/paymentActions';
import StripePaymentModal from '../../modals/StripePaymentModal';
import StripeTerminal from 'crowdbotics-react-native-stripe-terminal';
import customerSchema from '../../schemas/customerSchema';
import OrderSummary from '../common/OrderSummary';
import ErrorMessage from '../form/ErrorMessage';
import StyledText from '../common/StyledText';
import TextInput from '../common/TextInput';
import FormGroup from '../common/FormGroup';
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import styles from './OrderReviewStyle';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { Formik } from 'formik';
import _ from 'lodash';
import headerStyles from '../common/HeaderStyle'
import { NextIcon } from '../../images/svg';

class OrderReviewFinal extends Component {
    handlePayClick = async params => {
        if (await this.props.submitOrder(params)) {
            if (this.props.cart.submittedOrder.paymentIntents[0]) {
                this.props.openModal();
            }
        }
    };

    handleCancelModal = async () => {
        this.props.closeModal();
        await StripeTerminal.abortCreatePayment();
        await this.props.releaseOrder();
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
        const { customerName, customerEmail, phone } = this.props.cart.order;
        const { amount, partnerFee } = this.props.cart.preparedOrder;
        let total = amount;
        if (partnerFee && !partnerFee.orderAmountIncludesPartnerFee) {
            total += partnerFee.amount;
        }

        return (
            <Formik
                initialValues={{ customerName, customerEmail, phone }}
                validationSchema={customerSchema}
                onSubmit={this.handlePayClick}
            >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                    <>
                        <Header
                            back={true}
                            right={() => true ? <TouchableOpacity onPress={handleSubmit} style={headerStyles.next}>
                                <Text style={headerStyles.nextText}>{'Next'}</Text>
                                <NextIcon />
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
                                        onPaymentCollect={this.props.startPaymentCollection}
                                        order={this.props.cart.order}
                                        payment={this.props.payment}
                                        device={device}
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
                )
                }
            </Formik>
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
