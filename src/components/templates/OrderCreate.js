import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import _ from 'lodash';
import Spinner from '../common/Spinner';
import Header from '../common/Header';
import { changeDemographics, changeAddOns, prepareOrder } from '../../actions/orderActions';
import { Formik } from 'formik';
import ErrorMessage from '../form/ErrorMessage';
import LoadingButton from '../common/LoadingButton';
import AddOnInput from '../common/AddOnInput';
import styles from './OrderCreateStyle';
import headerStyles from '../common/HeaderStyle'
import StyledText from '../common/StyledText';
import Currency from '../common/Currency';
import orderUtil from '../../utils/OrderUtil';
import moment from 'moment';
import { BackIcon, NextIcon } from '../../images/svg';
import variables from '../../styles/variables';
import NavigationService from '../NavigationService';

class OrderCreate extends Component {
    handleDemographicChange = (id, quantity) => {
        this.props.changeDemographics(id, quantity);
    };

    handleAddonChange = (addOn, quantity, parent) => {
        this.props.changeAddOns(addOn, quantity, parent);
    };

    handleNextClick = params => {
        this.props.prepareOrder(params);
    };

    getBookingMaxCount() {
        const { date, experience } = this.props;
        const timeSlots = _.get(date.availability, date.selectedDate);
        const open = _.isArray(timeSlots) ? _.get(timeSlots, 0) : _.get(timeSlots, date.selectedTime);
        const experienceMax = experience.group.orderMax || experience.group.outingMax || 0;
        return experienceMax > 0 ? Math.min(open, experienceMax) : open;
    }

    validateForm = () => {
        const errors = {}
        const item = this.props.cart.order.items[this.props.cart.itemIndex];
        const { addOns = [], group } = this.props.experience;
        const quantity = _.sumBy(_.values(item.demographics), 'quantity');
        const max = this.getBookingMaxCount();

        if (quantity < (group.orderMin || 1)) {
            errors.quantity = `Quantity must be at least ${group.orderMin}`;
        }

        if (max && quantity > max) {
            errors.quantity = `You have exceeded the maximum capacity of ${max}`;
        }

        if (Object.keys(errors).length !== 0) {
            Alert.alert('Error', JSON.stringify(Object.values(errors)))
            return false
        } else {
            return true
        }
    };

    handleNext = () => {
        if (this.validateForm()) {
            NavigationService.navigate('OrderCreateAddOn');
        }
    }

    render() {
        const { order, itemIndex } = this.props.cart;
        const { availability, selectedTime } = this.props.date;
        const { experience } = this.props;
        const item = order.items[itemIndex];
        let max = availability[selectedTime];

        return (<>
            <Header
                back={true}
                right={() => true ? <TouchableOpacity onPress={() => this.handleNext()} style={headerStyles.next}>
                    <Text style={headerStyles.nextText}>Next</Text>
                    <NextIcon />
                </TouchableOpacity> : <View />}
                steps={["Product", "Time", "Quantity", "Info", "Pay"]}
                currentStep={3}
            />
            <Formik validate={this.validateForm} onSubmit={this.handleNextClick}>
                {props => (
                    <Layout>
                        <View style={styles.container}>
                            <ScrollView style={styles.quantity}>
                                <Text style={styles.label}>
                                    Select Quantity
                                </Text>
                                <View style={styles.demographics}>
                                    {_.map(item.demographics, demographic => {
                                        const demographicPrice = orderUtil.getDemographicPrice(
                                            experience,
                                            demographic.demographic.id,
                                        );
                                        return (
                                            <View style={styles.inputGroup} key={demographic.demographic.id}>
                                                <View style={styles.counterContainer}>
                                                    <Spinner
                                                        value={demographic.quantity}
                                                        onChange={this.handleDemographicChange}
                                                        id={demographic.demographic.id}
                                                        max={max}
                                                        min={0}
                                                    />
                                                </View>
                                                <View style={styles.labelContainer}>
                                                    <Text style={styles.demographic}>
                                                        {demographic.label}
                                                    </Text>
                                                    {demographic.caption && (
                                                        <Text style={styles.caption}>
                                                            {demographic.caption}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </Layout>
                )}
            </Formik>
        </>
        );
    }
}

const mapStateToProps = state => ({
    cart: state.cart,
    date: state.date,
    experience: state.experiences.collection[state.cart.order.items[state.cart.itemIndex].experience.id],
});

const mapDispatchToProps = {
    changeDemographics,
    changeAddOns,
    prepareOrder,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderCreate);
