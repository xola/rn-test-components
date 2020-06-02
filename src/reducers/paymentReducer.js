import { createReducer } from '@reduxjs/toolkit';
import {
    CLOSE_PAYMENT_MODAL,
    COLLECT_PAYMENT_FAILED,
    COLLECT_PAYMENT_REQUESTED,
    COLLECT_PAYMENT_SUCCEEDED,
    CONFIRM_PAYMENT_FAILED,
    CONFIRM_PAYMENT_REQUESTED,
    INIT_PAYMENT_FAILED,
    INIT_PAYMENT_REQUESTED,
    INIT_PAYMENT_SUCCEEDED,
    OPEN_PAYMENT_MODAL,
    PAYMENT_FAILED,
} from '../actions/paymentActions';
import {
    COMMIT_ORDER_FAILED,
    COMMIT_ORDER_SUCCEEDED,
    RELEASE_ORDER_FAILED,
    RELEASE_ORDER_SUCCEEDED,
} from '../actions/orderActions';
import { STATUS_COLLECTING, STATUS_CONFIRMING, STATUS_ERROR } from '../constants/paymentConstants';

export const initialState = {
    intent: null,
    isOpen: null,
    isInitiated: false,
    status: null,
    errorMessage: null,
};

const paymentReducer = createReducer(initialState, {
    [OPEN_PAYMENT_MODAL](state) {
        state.isOpen = true;
    },
    [CLOSE_PAYMENT_MODAL](state) {
        state.isInitiated = false;
        state.status = STATUS_COLLECTING;
        state.isOpen = false;
    },
    [INIT_PAYMENT_REQUESTED](state) {
        state.isInitiated = true;
    },
    [INIT_PAYMENT_SUCCEEDED](state, { intent }) {
        state.intent = intent;
    },
    [INIT_PAYMENT_FAILED](state, { error }) {
        state.errorMessage = error;
        state.status = STATUS_ERROR;
    },
    [COLLECT_PAYMENT_REQUESTED](state) {
        state.status = STATUS_COLLECTING;
    },
    [COLLECT_PAYMENT_FAILED](state, { error }) {
        state.errorMessage = error;
        state.status = STATUS_ERROR;
    },
    [CONFIRM_PAYMENT_REQUESTED](state) {
        state.status = STATUS_CONFIRMING;
    },
    [CONFIRM_PAYMENT_FAILED](state, { error }) {
        state.errorMessage = error;
        state.status = STATUS_ERROR;
    },
    [PAYMENT_FAILED](state, { error }) {
        state.errorMessage = error;
        state.status = STATUS_ERROR;
    },
    [COMMIT_ORDER_SUCCEEDED](state) {
        state.isInitiated = false;
        state.isOpen = false;
    },
    [COMMIT_ORDER_FAILED](state) {
        state.isInitiated = false;
        state.isOpen = false;
    },
    [RELEASE_ORDER_SUCCEEDED](state) {
        state.isInitiated = false;
        state.isOpen = false;
    },
    [RELEASE_ORDER_FAILED](state) {
        state.isInitiated = false;
        state.isOpen = false;
    },
});

export default paymentReducer;
