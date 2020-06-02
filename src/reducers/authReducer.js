import {
    AUTHENTICATE_USER_SUCCEEDED,
    AUTHENTICATE_USER_FAILED,
    AUTHENTICATE_USER_REQUESTED,
    EMV_ENABLED,
    FETCH_SELLER_SUCCEEDED,
} from '../actions/authActions';
import { createReducer } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
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
    [AUTHENTICATE_USER_SUCCEEDED](state, { seller, user }) {
        state.isLoading = false;
        state.seller = seller;
        state.user = user;
        state.apiKey = user.apiKey;
    },
    [EMV_ENABLED](state) {
        state.isEMVEnabled = true;
    },
    [FETCH_SELLER_SUCCEEDED](state, { seller }) {
        state.seller = seller;
    },
});

export default authReducer;
