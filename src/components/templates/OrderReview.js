import { submitOrder, commitOrder, releaseOrder, updateCustomer } from '../../actions/orderActions';
import { dismissLatestError } from '../../actions/errorsActions';
import { TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
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
import Error409Modal from '../../modals/Error409Modal';

class OrderReview extends Component {
    componentWillUnmount() {
        this.props.dismissLatestError();
    }

    handleNextClick = async params => {
        const isOrderCreated = await this.props.submitOrder(params)
        if (isOrderCreated) {
            NavigationService.navigate('OrderReviewFinal')
        }
    };

    handleEndEditing = ({ customerName, customerEmail, phone }) => () => {
        this.props.updateCustomer({ customerName, customerEmail, phone });
    };

    handleError = async () => {
        this.props.dismissLatestError();
        NavigationService.navigate('ExperienceAvailability')
    }

    render() {
        const { customerName, customerEmail, phone } = this.props.cart.order;

        return (
            <View style={styles.container}>
                <Formik
                    initialValues={{ customerName, customerEmail, phone }}
                    validationSchema={customerSchema}
                    onSubmit={this.handleNextClick}
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
                            <Layout
                                modals={<Error409Modal
                                    toggle={this.props.latestError?.error === 'Request failed with status code 409'}
                                    onClose={this.handleError}
                                    title="Sold Out"
                                    body="The date and time you had chosen just got sold out. Please try a different time in order to complete your purchase."
                                    buttonTitle="Choose another time"
                                />}
                            >
                                {this.props.cart.isLoading ? (
                                    <View style={styles.loading}>
                                        <ActivityIndicator size={'large'} />
                                    </View>
                                ) : (<ScrollView style={styles.container}>
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
                                )}
                            </Layout>
                        </>
                    )}
                </Formik>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    experience: state.experiences.collection[state.cart.order.items[state.cart.itemIndex].experience.id],
    item: state.cart.preparedOrder.items[state.cart.itemIndex],
    device: state.readers.computer.label,
    payment: state.payment,
    latestError: state.errors[state.errors.length - 1],
});

const mapDispatchToProps = {
    submitOrder,
    commitOrder,
    releaseOrder,
    startPaymentCollection,
    openModal,
    closeModal,
    updateCustomer,
    dismissLatestError
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderReview);
