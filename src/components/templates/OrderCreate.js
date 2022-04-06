import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
import StyledText from '../common/StyledText';
import Currency from '../common/Currency';
import orderUtil from '../../utils/OrderUtil';

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

        return errors;
    };

    render() {
        const { order, itemIndex } = this.props.cart;
        const { availability, selectedTime } = this.props.date;
        const { experience } = this.props;
        const item = order.items[itemIndex];
        let max = availability[selectedTime];

        return (
            <Formik validate={this.validateForm} onSubmit={this.handleNextClick}>
                {props => (
                    <Layout

                    >
                        <View style={styles.container}>
                            <ScrollView style={styles.quantity}>
                                <StyledText styleNames={['h1']} style={styles.headline}>
                                    Quantity
                                </StyledText>
                                <View style={styles.demographics}>
                                    <ErrorMessage name="quantity" />
                                    {_.map(item.demographics, demographic => {
                                        const demographicPrice = orderUtil.getDemographicPrice(
                                            experience,
                                            demographic.demographic.id,
                                        );
                                        return (
                                            <View style={styles.inputGroup} key={demographic.demographic.id}>
                                                <StyledText styleNames={['h3']} style={styles.label}>
                                                    {demographic.label}
                                                    {demographicPrice.price ? (
                                                        <StyledText>
                                                            {` (`}
                                                            <Currency>{demographicPrice.price}</Currency>
                                                            {` / ${demographicPrice.type})`}
                                                        </StyledText>
                                                    ) : null}
                                                </StyledText>
                                                <StyledText style={styles.description}>
                                                    {demographic.caption}
                                                </StyledText>
                                                <Spinner
                                                    value={demographic.quantity}
                                                    onChange={this.handleDemographicChange}
                                                    id={demographic.demographic.id}
                                                    max={max}
                                                    min={0}
                                                />
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                            {_.size(item.addOns) > 0 ? (
                                <ScrollView style={styles.quantity}>
                                    <StyledText styleNames={['h1']} style={styles.headline}>
                                        Add-ons
                                    </StyledText>
                                    <View style={styles.addons}>
                                        <ErrorMessage name="addOns" />
                                        {_.map(item.addOns, (addOn, index) => {
                                            if (addOn.visibility !== 'private') {
                                                return (
                                                    <View style={styles.inputGroup} key={index}>
                                                        <StyledText styleNames={['h3']} style={styles.label}>
                                                            {addOn.label}{' '}
                                                            {addOn.required ? (
                                                                <StyledText styleNames={['required']}>*</StyledText>
                                                            ) : null}
                                                            {addOn.configuration.price && addOn.object ? (
                                                                <StyledText>
                                                                    {` (`}
                                                                    <Currency>{addOn.configuration.price}</Currency>
                                                                    {` / add-on)`}
                                                                </StyledText>
                                                            ) : null}
                                                        </StyledText>
                                                        <StyledText style={styles.description}>
                                                            {addOn.description}
                                                        </StyledText>
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
                )}
            </Formik>
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
