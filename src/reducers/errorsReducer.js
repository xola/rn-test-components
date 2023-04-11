import { AUTHENTICATE_USER_FAILED, AUTHENTICATE_USER_SUCCEEDED, FETCH_SELLER_FAILED } from '../actions/authActions';
import { DISMISS_LATEST_ERROR } from '../actions/errorsActions';
import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';

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
});

export default errorsReducer;
