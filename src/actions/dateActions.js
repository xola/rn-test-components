import xolaApi from '../api/xolaApi';
import NavigationService from '../components/NavigationService';

export const FETCH_AVAILABILITY_REQUESTED = 'FETCH_AVAILABILITY_REQUESTED';
export const FETCH_AVAILABILITY_SUCCEEDED = 'FETCH_AVAILABILITY_SUCCEEDED';
export const FETCH_AVAILABILITY_FAILED = 'FETCH_AVAILABILITY_FAILED';

export const SELECT_DATE = 'SELECT_DATE';
export const SELECT_TIME = 'SELECT_TIME';

export const selectDate = date => async (dispatch, getState) => {
    try {
        dispatch({ type: SELECT_DATE, date: date });
        dispatch({ type: FETCH_AVAILABILITY_REQUESTED });
        const { selectedExperience } = getState().experiences;

        const response = await xolaApi.get(`/api/experiences/${selectedExperience}/availability?start=${date}`);

        dispatch({
            type: FETCH_AVAILABILITY_SUCCEEDED,
            availability: response.data,
        });
    } catch (e) {
        dispatch({ type: FETCH_AVAILABILITY_FAILED, error: e.message });
    }
};

export const selectTime = time => dispatch => {
    dispatch({
        type: SELECT_TIME,
        time: time,
    });
    NavigationService.navigate('OrderCreate');
};
