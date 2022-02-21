import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import { PAYMENT_INTENT_METHOD_CARD_PRESENT, PAYMENT_METHOD_INTENT } from '../constants/paymentConstants';
import { SOURCE_KIOSK, STATUS_HOLD } from '../constants/orderConstants';
import { SELECT_EXPERIENCE } from '../actions/experiencesActions';
import { SELECT_DATE, SELECT_TIME } from '../actions/dateActions';
import {
    CHANGE_ADDON,
    CHANGE_DEMOGRAPHICS,
    PREPARE_ORDER_SUCCEEDED,
    PREPARE_ORDER_FAILED,
    PREPARE_ORDER_REQUESTED,
    SUBMIT_ORDER_REQUESTED,
    SUBMIT_ORDER_FAILED,
    SUBMIT_ORDER_SUCCEEDED,
    COMMIT_ORDER_SUCCEEDED,
    COMMIT_ORDER_FAILED,
    RELEASE_ORDER_SUCCEEDED,
    RELEASE_ORDER_FAILED,
    UPDATE_CUSTOMER,
} from '../actions/orderActions';
import { RESET_CART } from '../actions/cartActions';

/**
 * order - order object that is being constructed during booking process.
 * itemIndex - index of current item in the cart. Not being incremented currently but here for possible future multi-item orders workflow
 * preparedOrder - response from api/order/prepare endpoint
 */
export const initialState = {
    preparedOrder: {},
    submittedOrder: {},
    itemIndex: 0,
    order: { items: [], customerName: '', phone: '', customerEmail: '', source: SOURCE_KIOSK },
};

const cartReducer = createReducer(initialState, {
    [SELECT_EXPERIENCE](state, { experience }) {
        const item = { experience: { id: experience.id } };

        const demographics = _.map(experience.demographics, demographic => ({
            demographic: { id: demographic.id },
            quantity: 0,
            label: demographic.label,
            caption: demographic.caption,
        }));

        item.demographics = _.mapKeys(demographics, demographic => demographic.demographic.id);

        const addOns = _.map(experience.addOns, addOn => ({
            configuration: { id: addOn.id, price: addOn.price },
            quantity: 0,
            label: addOn.name,
            description: addOn.desc,
            caption: addOn.desc,
            visibility: addOn.visibility,
            required: addOn.required,
            object: addOn.object,
            choices: addOn['choices'],
        }));

        item.addOns = _.mapKeys(addOns, addOn => addOn.configuration.id);
        item.quantity = 0;
        state.order.items[state.itemIndex] = item;
    },

    [SELECT_DATE](state, { date }) {
        state.order.items[state.itemIndex].arrival = date;
    },

    [SELECT_TIME](state, { time }) {
        if (time) {
            state.order.items[state.itemIndex].arrivalTime = time;
        }
    },

    [CHANGE_DEMOGRAPHICS](state, { demographic }) {
        state.order.items[state.itemIndex].demographics[demographic.id].quantity = demographic.quantity;

        state.order.items[state.itemIndex].quantity = _.reduce(
            state.order.items[state.itemIndex].demographics,
            (quantity, demographic) => quantity + demographic.quantity,
            0,
        );
    },

    [CHANGE_ADDON](state, { addOn, quantity, parent }) {
        if (parent) {
            addOn.quantity = quantity;
            addOn.parent = state.order.items[state.itemIndex].addOns[parent.id];
            state.order.items[state.itemIndex].addOns[addOn.configuration.id] = addOn;
        } else {
            state.order.items[state.itemIndex].addOns[addOn.configuration.id].quantity = quantity;
        }
    },

    [PREPARE_ORDER_SUCCEEDED](state, { data }) {
        state.isLoading = false;
        state.preparedOrder = data;

        state.preparedOrder.items[state.itemIndex].quantity = _.reduce(
            state.order.items[state.itemIndex].demographics,
            (quantity, demographic) => quantity + demographic.quantity,
            0,
        );

        state.preparedOrder.items[state.itemIndex].status = STATUS_HOLD;

        state.preparedOrder.payment = {
            method: PAYMENT_METHOD_INTENT,
            paymentIntentMethods: [PAYMENT_INTENT_METHOD_CARD_PRESENT],
        };

        state.preparedOrder.tags = [{ id: 'Kiosk', system: true }];
    },

    [PREPARE_ORDER_REQUESTED](state) {
        state.isLoading = true;
    },

    [PREPARE_ORDER_FAILED](state) {
        state.isLoading = false;
    },

    [SUBMIT_ORDER_REQUESTED](state, { customerName, customerEmail, phone }) {
        state.isLoading = true;
        state.preparedOrder.customerName = customerName;
        state.preparedOrder.customerEmail = customerEmail;
        state.preparedOrder.phone = phone;
        state.preparedOrder.source = SOURCE_KIOSK;
    },

    [SUBMIT_ORDER_SUCCEEDED](state, { order }) {
        state.submittedOrder = order;
    },

    [SUBMIT_ORDER_FAILED](state) {
        state.isLoading = false;
    },

    [COMMIT_ORDER_SUCCEEDED](state) {
        state.isLoading = false;
    },

    [COMMIT_ORDER_FAILED](state) {
        state.isLoading = false;
    },

    [RELEASE_ORDER_SUCCEEDED](state) {
        state.isLoading = false;
    },

    [RELEASE_ORDER_FAILED](state) {
        state.isLoading = false;
    },

    [UPDATE_CUSTOMER](state, { customerName, customerEmail, phone }) {
        _.assign(state.order, { customerName, customerEmail, phone });
    },

    [RESET_CART](state) {
        _.assign(state, initialState);
    },
});

export default cartReducer;
