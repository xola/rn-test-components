import xolaApi from '../api/xolaApi';
import _ from 'lodash';
import { Alert } from 'react-native'
import NavigationService from '../components/NavigationService';
import { GUEST_STATUS_ARRIVED, STATUS_ACCEPTED, SOURCE_KIOSK } from '../constants/orderConstants';

export const CHANGE_DEMOGRAPHICS = 'CHANGE_DEMOGRAPHICS';

export const CHANGE_ADDON = 'CHANGE_ADDON';

export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';

export const SELECT_ORDER_ITEM = 'SELECT_ORDER_ITEM';

export const PREPARE_ORDER_REQUESTED = 'PREPARE_ORDER_REQUESTED';
export const PREPARE_ORDER_SUCCEEDED = 'PREPARE_ORDER_SUCCEEDED';
export const PREPARE_ORDER_FAILED = 'PREPARE_ORDER_FAILED';

export const SUBMIT_ORDER_REQUESTED = 'SUBMIT_ORDER_REQUESTED';
export const SUBMIT_ORDER_SUCCEEDED = 'SUBMIT_ORDER_SUCCEEDED';
export const SUBMIT_ORDER_FAILED = 'SUBMIT_ORDER_FAILED';

export const COMMIT_ORDER_REQUESTED = 'COMMIT_ORDER_REQUESTED';
export const COMMIT_ORDER_SUCCEEDED = 'COMMIT_ORDER_SUCCEEDED';
export const COMMIT_ORDER_FAILED = 'COMMIT_ORDER_FAILED';

export const RELEASE_ORDER_REQUESTED = 'RELEASE_ORDER_REQUESTED';
export const RELEASE_ORDER_SUCCEEDED = 'RELEASE_ORDER_SUCCEEDED';
export const RELEASE_ORDER_FAILED = 'RELEASE_ORDER_FAILED';

export const SEARCH_ORDERS_REQUESTED = 'SEARCH_ORDERS_REQUESTED';
export const SEARCH_ORDERS_SUCCEEDED = 'SEARCH_ORDERS_SUCCEEDED';
export const SEARCH_ORDERS_FAILED = 'SEARCH_ORDERS_FAILED';

export const CHECKIN_ITEM_REQUESTED = 'CHECKIN_ITEM_REQUESTED';
export const CHECKIN_ITEM_SUCCEEDED = 'CHECKIN_ITEM_SUCCEEDED';
export const CHECKIN_ITEM_FAILED = 'CHECKIN_ITEM_FAILED';

export const EMPTY_SEARCH_RESULT = 'EMPTY_SEARCH_RESULT';
export const RESET_EMPTY_SEARCH_RESULT = 'RESET_EMPTY_SEARCH_RESULT';

export const toQueryString = (params, leadingSign = false) =>
    Object.keys(params).length
        ? (leadingSign ? '?' : '') +
        Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
        : ''

export const searchOrders = (searchTerm, seller) => async dispatch => {
    try {
        dispatch({ type: SEARCH_ORDERS_REQUESTED });
        const params = { dashboard: searchTerm, limit: 100, seller: seller }
        let { data } = await xolaApi.get(`/api/orders?${toQueryString(params)}`, {
            params: { authenticate: true, seller: seller }
        });
        let result = data.data;
        dispatch({ type: SEARCH_ORDERS_SUCCEEDED, orders: result });
    } catch (e) {
        dispatch({ type: SEARCH_ORDERS_FAILED, error: e.message });
    }
};

export const showEmptySearchResult = () => ({
    type: EMPTY_SEARCH_RESULT,
});

export const resetEmptySearchResult = () => ({
    type: RESET_EMPTY_SEARCH_RESULT,
});

export const checkInItem = (order, item) => async (dispatch, getState) => {
    try {
        dispatch({ type: CHECKIN_ITEM_REQUESTED });
        const data = {
            items: [
                {
                    id: item.id,
                    guestStatus: GUEST_STATUS_ARRIVED,
                },
            ],
        };
        if (item.status < STATUS_ACCEPTED) {
            const { name } = getState().auth.seller;
            dispatch({
                type: CHECKIN_ITEM_FAILED,
                error: `This booking is not confirmed. Please reach out to ${name}`,
            });
            return;
        }
        const url = `/api/orders/${order.id}/checkInGuests`;
        await xolaApi.post(url, data, { params: { authenticate: true } });
        dispatch({ type: CHECKIN_ITEM_SUCCEEDED, orderId: order.id });
        NavigationService.navigate('CheckInSuccessPage', { message: 'Check-in successful!', item: item });
    } catch (e) {
        Alert.alert('Error', e.message)
        dispatch({ type: CHECKIN_ITEM_FAILED, error: e.message });
    }
};

export const changeDemographics = (id, quantity) => ({
    type: CHANGE_DEMOGRAPHICS,
    demographic: {
        id,
        quantity,
    },
});

export const changeAddOns = (addOn, quantity, parent) => ({
    type: CHANGE_ADDON,
    addOn,
    quantity,
    parent,
});

export const updateCustomer = ({ customerName, customerEmail, phone }) => ({
    type: UPDATE_CUSTOMER,
    customerName,
    customerEmail,
    phone,
});

export const prepareOrder = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PREPARE_ORDER_REQUESTED });
        const { order, itemIndex } = getState().cart;
        const request = _.cloneDeep(order);
        request.source = SOURCE_KIOSK;
        request.items[itemIndex].addOns = _.pickBy(request.items[itemIndex].addOns, addOn => {
            return addOn.object !== 'choices';
        });
        const response = await xolaApi.post('/api/orders/prepare', request);
        dispatch({
            type: PREPARE_ORDER_SUCCEEDED,
            data: response.data,
        });

        NavigationService.navigate('OrderReview');
    } catch (e) {
        dispatch({ type: PREPARE_ORDER_FAILED, error: e.message, data: _.get(e, 'response.data') });
    }
};

export const submitOrder = params => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUBMIT_ORDER_REQUESTED,
            customerName: params.customerName,
            customerEmail: params.customerEmail,
            phone: params.phone,
        });

        const { preparedOrder } = getState().cart;
        const response = await xolaApi.post('/api/orders', preparedOrder);
        dispatch({ type: SUBMIT_ORDER_SUCCEEDED, order: response.data });
        console.log(response.data)
        return true;
    } catch (e) {
        dispatch({ type: SUBMIT_ORDER_FAILED, error: e.message, data: _.get(e, 'response.data') });
        return false;
    }
};

export const commitOrder = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COMMIT_ORDER_REQUESTED });
        const { submittedOrder } = getState().cart;
        const { apiKey } = submittedOrder.organizer;
        const response = await xolaApi.post(`/api/orders/${submittedOrder.id}/commit`, submittedOrder, {
            headers: { 'X-API-KEY': apiKey },
        });
        dispatch({
            type: COMMIT_ORDER_SUCCEEDED,
            data: response.data,
        });
        NavigationService.navigate('TicketPrinting');
    } catch (e) {
        dispatch({ type: COMMIT_ORDER_FAILED, error: e.message, data: _.get(e, 'response.data') });
    }
};

export const releaseOrder = () => async (dispatch, getState) => {
    try {
        dispatch({ type: RELEASE_ORDER_REQUESTED });
        const { submittedOrder } = getState().cart;
        const { apiKey } = submittedOrder.organizer;
        const response = await xolaApi.post(`/api/orders/${submittedOrder.id}/release`, submittedOrder, {
            headers: { 'X-API-KEY': apiKey },
        });
        dispatch({
            type: RELEASE_ORDER_SUCCEEDED,
            data: response.data,
        });
    } catch (e) {
        dispatch({ type: RELEASE_ORDER_FAILED, error: e.message, data: _.get(e, 'response.data') });
    }
};

export const selectOrderItem = (orderId, itemId) => ({
    type: SELECT_ORDER_ITEM,
    orderId,
    itemId,
});
