import { submitOrder, commitOrder, releaseOrder, updateCustomer } from '../../actions/orderActions';
import { TouchableOpacity } from 'react-native';
import { startPaymentCollection, openModal, closeModal } from '../../actions/paymentActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import customerSchema from '../../schemas/customerSchema';
import ErrorMessage from '../form/ErrorMessage';
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
import NavigationService from '../NavigationService';

class OrderReview extends Component {
    handlePayClick = async params => {
        NavigationService.navigate('OrderReviewFinal')
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
                            currentStep={4}
                        />
                        <Layout>
                            <View style={styles.container}>
                                <KeyboardAwareScrollView style={styles.info}>
                                    <Text style={styles.title}>
                                        Guest Information
                                    </Text>

                                    <FormGroup>
                                        <View style={styles.form}>
                                            <TextInput
                                                onChangeText={handleChange('customerName')}
                                                onBlur={handleBlur('customerName')}
                                                onEndEditing={this.handleEndEditing(values)}
                                                value={values.customerName}
                                                placeholder="Name"
                                                title="Name"
                                            />

                                            <ErrorMessage name="customerName" />
                                        </View>
                                    </FormGroup>

                                    <FormGroup>
                                        <View>
                                            <TextInput
                                                onChangeText={handleChange('customerEmail')}
                                                onBlur={handleBlur('customerEmail')}
                                                onEndEditing={this.handleEndEditing(values)}
                                                value={values.customerEmail}
                                                placeholder="Email"
                                                keyboardType="email-address"
                                                title="Email"
                                            />

                                            <ErrorMessage name="customerEmail" />
                                        </View>
                                    </FormGroup>

                                    <FormGroup>
                                        <View>
                                            <TextInput
                                                onChangeText={handleChange('phone')}
                                                onBlur={handleBlur('phone')}
                                                onEndEditing={this.handleEndEditing(values)}
                                                value={values.phone}
                                                placeholder={'Phone'}
                                                keyboardType="phone-pad"
                                                title="Mobile Phone"
                                            />
                                        </View>
                                    </FormGroup>
                                </KeyboardAwareScrollView>
                            </View>
                        </Layout>
                    </>
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
