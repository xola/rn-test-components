import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import Layout from '../common/Layout';
import _ from 'lodash';
import Header from '../common/Header';
import { changeDemographics, changeAddOns, prepareOrder } from '../../actions/orderActions';
import ErrorMessage from '../form/ErrorMessage';
import AddOnInput from '../common/AddOnInput';
import styles from './OrderCreateAddOnStyle';
import headerStyles from '../common/HeaderStyle'
import { NextIcon } from '../../images/svg';

class OrderCreate extends Component {
    handleDemographicChange = (id, quantity) => {
        this.props.changeDemographics(id, quantity);
    };

    handleAddonChange = (addOn, quantity, parent) => {
        this.props.changeAddOns(addOn, quantity, parent);
    };

    getBookingMaxCount() {
        const { date, experience } = this.props;
        const timeSlots = _.get(date.availability, date.selectedDate);
        const open = _.isArray(timeSlots) ? _.get(timeSlots, 0) : _.get(timeSlots, date.selectedTime);
        const experienceMax = experience.group.orderMax || experience.group.outingMax || 0;
        return experienceMax > 0 ? Math.min(open, experienceMax) : open;
    }

    validateForm = values => {
        const errors = {};
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

        const requiredAddOns = addOns.filter(addOn => addOn.required);

        requiredAddOns.forEach(addOn => {
            if (addOn.choices) {
                const optionSelected = addOn.choices.some(choice => {
                    return item.addOns[choice.id] && item.addOns[choice.id].quantity > 0;
                });

                if (!optionSelected) {
                    errors.addOns = `${addOn.name} is required`;
                }
            } else {
                const requiredAddOn = item.addOns[addOn.id];

                if (!requiredAddOn || requiredAddOn.quantity === 0) {
                    errors.addOns = `${addOn.name} is required`;
                }
            }
        });

        if (Object.keys(errors).length !== 0) {
            Alert.alert('Error', JSON.stringify(Object.values(errors)))
            return false
        } else {
            return true
        }
    };

    handleNext = () => {
        if (this.validateForm()) {
            this.props.prepareOrder();
        }
    }

    render() {
        const { order, itemIndex } = this.props.cart;
        const item = order.items[itemIndex];
        const { addOns = [], group } = this.props.experience;
        const requiredAddOns = addOns.filter(addOn => addOn.required).length;
        const selected = _.sumBy(_.values(item.addOns), 'quantity');

        return (<>
            <Header
                back={true}
                right={() => true ? <TouchableOpacity onPress={() => this.handleNext()} style={headerStyles.next}>
                    <Text style={headerStyles.nextText}>{(requiredAddOns !== 0 || selected !== 0) ? 'Next' : 'Skip'}</Text>
                    <NextIcon />
                </TouchableOpacity> : <View />}
                steps={["Product", "Time", "Quantity", "Info", "Pay"]}
                currentStep={3}
            />

            <Layout>
                <View style={styles.container}>
                    {_.size(item.addOns) > 0 ? (
                        <ScrollView style={styles.quantity}>
                            <Text style={styles.label}>
                                Add-ons
                            </Text>
                            <View style={styles.addons}>
                                <ErrorMessage name="addOns" />
                                {_.map(item.addOns, (addOn, index) => {
                                    if (addOn.visibility !== 'private') {
                                        return (
                                            <View style={styles.inputGroup} key={index}>
                                                <AddOnInput
                                                    addOn={addOn}
                                                    onAddonChange={this.handleAddonChange}
                                                />
                                            </View>
                                        );
                                    }
                                })}
                            </View>
                        </ScrollView>
                    ) : null}
                </View>
            </Layout>
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
