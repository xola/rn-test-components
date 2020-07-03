import { submitOrder, commitOrder, releaseOrder, updateCustomer } from '../../actions/orderActions';
import { startPaymentCollection, openModal, closeModal } from '../../actions/paymentActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StripePaymentModal from '../../modals/StripePaymentModal';
import StripeTerminal from 'react-native-stripe-terminal';
import customerSchema from '../../schemas/customerSchema';
import LoadingButton from '../common/LoadingButton';
import OrderSummary from '../common/OrderSummary';
import ErrorMessage from '../form/ErrorMessage';
import StyledText from '../common/StyledText';
import TextInput from '../common/TextInput';
import FormGroup from '../common/FormGroup';
import { View, Text } from 'react-native';
import Currency from '../common/Currency';
import React, { Component } from 'react';
import styles from './OrderReviewStyle';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import Header from '../common/Header';
import { Formik } from 'formik';
import _ from 'lodash';

class OrderReview extends Component {
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
        const { amount } = this.props.cart.preparedOrder;
        const total = amount;

        return (
            <Formik
                initialValues={{ customerName, customerEmail, phone }}
                validationSchema={customerSchema}
                onSubmit={this.handlePayClick}
            >
                {({ values, handleChange, handleBlur, handleSubmit }) => (
                    <Layout
                        header={<Header currentStep={4} title={'Review & Confirm Booking'} back={'OrderCreate'} />}
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
                        footer={
                            <LoadingButton
                                isLoading={this.props.cart.isLoading}
                                title={
                                    <StyledText styleNames={['h2']}>
                                        Pay <Currency>{total}</Currency>
                                    </StyledText>
                                }
                                styleNames={['large', 'success']}
                                onPress={handleSubmit}
                            />
                        }
                    >
                        <View style={styles.container}>
                            <KeyboardAwareScrollView style={styles.info}>
                                <StyledText styleNames={['h1']} style={styles.headline}>
                                    Contact Info
                                </StyledText>

                                <FormGroup>
                                    <Text style={styles.label}>Full Name</Text>

                                    <View>
                                        <TextInput
                                            onChangeText={handleChange('customerName')}
                                            onBlur={handleBlur('customerName')}
                                            onEndEditing={this.handleEndEditing(values)}
                                            value={values.customerName}
                                            placeholder="Name"
                                        />

                                        <ErrorMessage name="customerName" />
                                    </View>
                                </FormGroup>

                                <FormGroup>
                                    <Text style={styles.label}>Email</Text>

                                    <View>
                                        <TextInput
                                            onChangeText={handleChange('customerEmail')}
                                            onBlur={handleBlur('customerEmail')}
                                            onEndEditing={this.handleEndEditing(values)}
                                            value={values.customerEmail}
                                            placeholder="Email"
                                            keyboardType="email-address"
                                        />

                                        <ErrorMessage name="customerEmail" />
                                    </View>
                                </FormGroup>

                                <FormGroup>
                                    <Text style={styles.label}>Phone</Text>

                                    <View>
                                        <TextInput
                                            onChangeText={handleChange('phone')}
                                            onBlur={handleBlur('phone')}
                                            onEndEditing={this.handleEndEditing(values)}
                                            value={values.phone}
                                            placeholder={'Phone'}
                                            keyboardType="phone-pad"
                                        />
                                    </View>
                                </FormGroup>
                            </KeyboardAwareScrollView>

                            <View style={styles.info}>
                                <OrderSummary
                                    cart={this.props.cart}
                                    itemIndex={this.props.cart.itemIndex}
                                    experience={experience}
                                />
                            </View>
                        </View>
                    </Layout>
                )}
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
)(OrderReview);
