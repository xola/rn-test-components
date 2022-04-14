import {
    AUTHENTICATE_USER_SUCCEEDED,
    AUTHENTICATE_USER_FAILED,
    AUTHENTICATE_USER_REQUESTED,
    EMV_ENABLED,
    FETCH_SELLER_SUCCEEDED,
    FETCH_DELEGATORS_SUCCEEDED,
    LOGOUT_USER_REQUESTED,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_SUCCEEDED,
} from '../actions/authActions';
import { createReducer } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    sellers: [],
    seller: {},
    user: {},
    apiKey: null,
    isEMVEnabled: false,
};

const authReducer = createReducer(initialState, {
    [AUTHENTICATE_USER_REQUESTED](state) {
        state.isLoading = true;
    },
    [AUTHENTICATE_USER_FAILED](state) {
        state.isLoading = false;
    },
    [AUTHENTICATE_USER_SUCCEEDED](state, { seller, user, apiKey }) {
        state.isLoading = false;
        state.seller = seller;
        state.user = user;
        state.apiKey = apiKey;
    },
    [LOGOUT_USER_REQUESTED](state) {
        state.isLoading = true;
    },
    [LOGOUT_USER_FAILED](state) {
        state.isLoading = false;
    },
    [LOGOUT_USER_SUCCEEDED](state) {
        state = initialState
    },
    [EMV_ENABLED](state) {
        state.isEMVEnabled = true;
    },
    [FETCH_DELEGATORS_SUCCEEDED](state, { sellers, apiKey, user }) {
        state.sellers = sellers;
        state.apiKey = apiKey;
        state.user = user;
    },
    [FETCH_SELLER_SUCCEEDED](state, { seller }) {
        state.seller = seller;
    },
});

export default authReducer;
