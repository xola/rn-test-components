import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
    CHECKIN_ITEM_SUCCEEDED,
    SEARCH_ORDERS_FAILED,
    SEARCH_ORDERS_REQUESTED,
    SEARCH_ORDERS_SUCCEEDED,
    SELECT_ORDER_ITEM,
    EMPTY_SEARCH_RESULT,
    RESET_EMPTY_SEARCH_RESULT,
} from '../actions/orderActions';

/**
 * orders - results of a search
 * selectedOrder - id of an order that is being currently checked in
 */
export const initialState = {
    isLoading: false,
    collection: {},
    itemIndex: 0,
    selectedOrder: null,
    selectedItem: null,
    isEmpty: false,
};

const orderReducer = createReducer(initialState, {
    [SEARCH_ORDERS_REQUESTED](state) {
        state.isEmpty = false;
        state.isLoading = true;
    },

    [SEARCH_ORDERS_FAILED](state) {
        state.isLoading = false;
    },

    [SEARCH_ORDERS_SUCCEEDED](state, { orders }) {
        state.collection = _.mapKeys(orders, order => order.id);
        state.isLoading = false;
    },

    [CHECKIN_ITEM_SUCCEEDED](state, { orderId }) {
        state.selectedOrder = orderId;
    },

    [SELECT_ORDER_ITEM](state, { orderId, itemId }) {
        state.selectedOrder = orderId;
        state.selectedItem = itemId;
    },

    [EMPTY_SEARCH_RESULT](state) {
        state.isEmpty = true;
    },

    [RESET_EMPTY_SEARCH_RESULT](state) {
        state.isEmpty = false;
    },
});

export default orderReducer;
