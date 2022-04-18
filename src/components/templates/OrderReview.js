import { submitOrder, commitOrder, releaseOrder, updateCustomer } from '../../actions/orderActions';
import { TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { startPaymentCollection, openModal, closeModal } from '../../actions/paymentActions';
import customerSchema from '../../schemas/customerSchema';
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
        const { customerName, customerEmail, phone } = this.props.cart.order;

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardShouldPersistTaps="handled">
                <Formik
                    initialValues={{ customerName, customerEmail, phone }}
                    validationSchema={customerSchema}
                    onSubmit={this.handlePayClick}
                >
                    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
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
                                <ScrollView style={styles.container}>
                                    <Text style={styles.title}>
                                        Guest Information
                                    </Text>

                                    <FormGroup>
                                        <View style={styles.form}>
                                            <TextInput
                                                id={'customerName'}
                                                onChangeText={handleChange('customerName')}
                                                onBlur={handleBlur('customerName')}
                                                onEndEditing={this.handleEndEditing(values)}
                                                value={values.customerName}
                                                placeholder="Name"
                                                title="Name"
                                                error={errors.customerName}
                                            />
                                        </View>
                                    </FormGroup>

                                    <FormGroup>
                                        <View>
                                            <TextInput
                                                id={'customerEmail'}
                                                onChangeText={handleChange('customerEmail')}
                                                onBlur={handleBlur('customerEmail')}
                                                onEndEditing={this.handleEndEditing(values)}
                                                value={values.customerEmail}
                                                placeholder="Email"
                                                keyboardType="email-address"
                                                title="Email"
                                                error={errors.customerEmail}
                                            />
                                        </View>
                                    </FormGroup>

                                    <FormGroup>
                                        <View>
                                            <TextInput
                                                id={'phone'}
                                                onChangeText={handleChange('phone')}
                                                onBlur={handleBlur('phone')}
                                                onEndEditing={this.handleEndEditing(values)}
                                                value={values.phone}
                                                placeholder={'Phone'}
                                                keyboardType="phone-pad"
                                                title="Mobile Phone"
                                                error={errors.phone}
                                            />
                                        </View>
                                    </FormGroup>
                                </ScrollView>
                            </Layout>
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingView>
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
