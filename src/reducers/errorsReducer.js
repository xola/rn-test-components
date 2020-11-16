import { AUTHENTICATE_USER_FAILED, AUTHENTICATE_USER_SUCCEEDED, FETCH_SELLER_FAILED } from '../actions/authActions';
import { DISCONNECT_READER_FAILED, CONNECT_READER_FAILED, DISCOVER_READERS_FAILED } from '../actions/readersActions';
import {
    PREPARE_ORDER_FAILED,
    SUBMIT_ORDER_FAILED,
    COMMIT_ORDER_FAILED,
    RELEASE_ORDER_FAILED,
    CHECKIN_ITEM_FAILED,
    SEARCH_ORDERS_FAILED,
} from '../actions/orderActions';
import { DISMISS_LATEST_ERROR } from '../actions/errorsActions';
import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import { FETCH_EXPERIENCE_FAILED } from '../actions/experiencesActions';
import { FETCH_AVAILABILITY_FAILED } from '../actions/dateActions';

export const initialState = [];

const errorsReducer = createReducer(initialState, {
    [DISMISS_LATEST_ERROR](state) {
        return _.remove(state, state.length - 1);
    },

    [AUTHENTICATE_USER_FAILED](state, { error }) {
        state.push({
            title: 'Failed to authenticate user',
            error,
        });
    },

    [FETCH_SELLER_FAILED](state, { error }) {
        state.push({
            title: 'Failed to fetch seller',
            error,
        });
    },

    [AUTHENTICATE_USER_SUCCEEDED](state) {
        if (state.length > 0) {
            return _.remove(state, state.length - 1);
        }
    },

    [PREPARE_ORDER_FAILED](state, { error }) {
        state.push({
            title: 'There was an error submitting your order',
            error,
        });
    },

    [RELEASE_ORDER_FAILED](state, { error }) {
        state.push({
            title: 'There was an error cancelling your order',
            error,
        });
    },

    [COMMIT_ORDER_FAILED](state, { error }) {
        state.push({
            title: 'There was an error finalizing your order',
            error,
        });
    },

    [SUBMIT_ORDER_FAILED](state, { error }) {
        state.push({
            title: 'There was an error submitting your payment',
            error,
        });
    },

    [DISCOVER_READERS_FAILED](state, { error }) {
        state.push({
            title: 'There was an error while discovering readers',
            error,
        });
    },

    [CONNECT_READER_FAILED](state, { error }) {
        state.push({
            title: 'There was an error while connecting reader',
            error,
        });
    },

    [DISCONNECT_READER_FAILED](state, { error }) {
        state.push({
            title: 'There was an error while disconnecting reader',
            error,
        });
    },

    [CHECKIN_ITEM_FAILED](state, { error }) {
        state.push({
            title: 'There was an error while checking in',
            error,
        });
    },

    [SEARCH_ORDERS_FAILED](state, { error }) {
        state.push({
            title: 'There was an error while searching for orders',
            error,
        });
    },

    [FETCH_EXPERIENCE_FAILED](state, { error }) {
        state.push({
            title: 'There was an error while fetching experiences',
            error,
        });
    },

    [FETCH_AVAILABILITY_FAILED](state, { error }) {
        state.push({
            title: 'There was an error while fetching availability',
            error,
        });
    },
});

export default errorsReducer;
