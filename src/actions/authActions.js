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

export const authenticateUser = credentials => async dispatch => {
    try {
        dispatch({ type: AUTHENTICATE_USER_REQUESTED });
        let { data } = await xolaApi.get('/api/users/me', {
            headers: { Authorization: `Basic ${btoa(`${_.trim(credentials.username)}:${credentials.password}`)}` },
        });
        let user, seller;
        if (data.type !== 1) {
            const delegatorData = await xolaApi.get(`/api/delegators`, { headers: { 'X-API-KEY': data.apiKey } });
            const bootstrapData = await xolaApi.get(`/api/sellers/${delegatorData.data.data[0].id}/bootstrap`, {
                headers: { 'X-API-KEY': data.apiKey },
            });
            user = bootstrapData.data.user;
            seller = bootstrapData.data.seller;
        } else {
            user = data;
            seller = data;
        }

        const isSeller = _.includes(user.roles, ROLE_SELLER);
        const isAdmin = _.includes(user.roles, ROLE_SELLER_ADMIN);
        if (!isSeller && !isAdmin) {
            dispatch({ type: AUTHENTICATE_USER_FAILED, error: 'Seller or admin account required' });
            return;
        }
        const hasEmvEnabled = _.includes(seller.roles, ROLE_EMV);
        if (hasEmvEnabled) {
            dispatch({ type: EMV_ENABLED });
        }
        if (seller.preferences.language) {
            let locale = seller.preferences.language.locale.replace('_', '-');
            if (locale === 'en-US') {
                locale = 'en';
            }
            moment.locale(locale);
        }
        dispatch({ type: AUTHENTICATE_USER_SUCCEEDED, seller: seller, user: user });
        NavigationService.navigate('Setup');
    } catch (e) {
        dispatch({ type: AUTHENTICATE_USER_FAILED, error: 'Invalid username or password' });
    }
};

export const fetchSellerData = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_SELLER_REQUESTED });
        const { apiKey } = getState().auth.user;
        const { id } = getState().auth.seller;
        const { data } = await xolaApi.get(`/api/sellers/${id}/bootstrap`, {
            headers: { 'X-API-KEY': apiKey },
        });

        dispatch({ type: FETCH_SELLER_SUCCEEDED, seller: data.seller });
    } catch (e) {
        dispatch({ type: FETCH_SELLER_FAILED, error: 'Invalid username or password' });
    }
};
