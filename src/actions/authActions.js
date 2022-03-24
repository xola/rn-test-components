import xolaApi from '../api/xolaApi';
import _ from 'lodash';
import NavigationService from '../components/NavigationService';
import { encode as btoa } from 'base-64';
import moment from 'moment';
import { ROLE_SELLER, ROLE_SELLER_ADMIN, ROLE_EMV } from '../constants/sellerConstants';

export const AUTHENTICATE_USER_REQUESTED = 'AUTHENTICATE_USER_REQUESTED';
export const AUTHENTICATE_USER_SUCCEEDED = 'AUTHENTICATE_USER_SUCCEEDED';
export const AUTHENTICATE_USER_FAILED = 'AUTHENTICATE_USER_FAILED';

export const FETCH_SELLER_REQUESTED = 'FETCH_SELLER_REQUESTED';
export const FETCH_SELLER_SUCCEEDED = 'FETCH_SELLER_SUCCEEDED';
export const FETCH_SELLER_FAILED = 'FETCH_SELLER_FAILED';

export const EMV_ENABLED = 'EMV_ENABLED';

export const FETCH_DELEGATORS_REQUESTED = 'FETCH_DELEGATORS_REQUESTED';
export const FETCH_DELEGATORS_SUCCEEDED = 'FETCH_DELEGATORS_SUCCEEDED';

export const authenticateUser = credentials => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTHENTICATE_USER_REQUESTED });
        let { data } = await xolaApi.get('/api/users/me', {
            headers: { Authorization: `Basic ${btoa(`${_.trim(credentials.username)}:${credentials.password}`)}` },
        });
        let user, seller;
        if (data.type !== 1) {
            await dispatch(fetchDelegates(data));
            if (getState().auth.sellers.length === 1) {
                await dispatch(selectSeller(getState().auth.sellers[0].id));
            } else {
                NavigationService.navigate('SelectSeller');
                return;
            }
        } else {
            user = data;
            seller = data;
        }

        dispatch(selectDelegate(user, seller));
    } catch (e) {
        console.log(e.message);
        dispatch({ type: AUTHENTICATE_USER_FAILED, error: 'Invalid username or password' });
    }
};

export const fetchDelegates = user => async dispatch => {
    dispatch({ type: FETCH_DELEGATORS_REQUESTED });
    const delegatorData = await xolaApi.get(`/api/delegators`, { headers: { 'X-API-KEY': user.apiKey } });
    dispatch({ type: FETCH_DELEGATORS_SUCCEEDED, sellers: delegatorData.data.data, apiKey: user.apiKey, user: user });
};

export const selectDelegate = (user, seller) => async (dispatch, getState) => {
    const isSellerOrAdmin =
        user.type === 1 ||
        _.find(user.permissions, permission => {
            return permission.name === ROLE_SELLER || permission.name === ROLE_SELLER_ADMIN;
        });

    if (!isSellerOrAdmin) {
        dispatch({ type: AUTHENTICATE_USER_FAILED, error: 'Seller or admin account required' });
        return;
    }
    const hasEmvEnabled = _.includes(seller.roles, ROLE_EMV);
    if (hasEmvEnabled) {
        dispatch({ type: EMV_ENABLED });
    }
    if (seller.preferences.language && seller.preferences.language.locale) {
        let locale = seller.preferences.language.locale.replace('_', '-');
        if (locale === 'en-US') {
            locale = 'en';
        }
        moment.locale(locale);
    }
    const apiKey = user.apiKey ? user.apiKey : getState().auth.apiKey;
    dispatch({ type: AUTHENTICATE_USER_SUCCEEDED, seller: seller, user: user, apiKey: apiKey });
    NavigationService.navigate('Setup');
};

export const selectSeller = sellerId => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_SELLER_REQUESTED });
        const { data } = await xolaApi.get(`/api/sellers/${sellerId}`, {
            headers: { 'X-API-KEY': getState().auth.apiKey },
        });
        dispatch({ type: FETCH_SELLER_SUCCEEDED, seller: data });
        const user = _.find(data.delegates, delegate => {
            return delegate.user.email === getState().auth.user.username;
        });
        dispatch(selectDelegate(user, data));
    } catch (e) {
        dispatch({ type: FETCH_SELLER_FAILED, error: 'Invalid username or password' });
    }
};
