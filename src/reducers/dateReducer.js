import {
    FETCH_AVAILABILITY_SUCCEEDED,
    FETCH_AVAILABILITY_FAILED,
    FETCH_AVAILABILITY_REQUESTED,
    SELECT_TIME,
    SELECT_DATE,
} from '../actions/dateActions';
import { createReducer } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    selectedDate: null,
    selectedTime: null,
    availability: {},
};

const dateReducer = createReducer(initialState, {
    [SELECT_DATE](state, { date }) {
        state.selectedDate = date;
    },
    [FETCH_AVAILABILITY_REQUESTED](state) {
        state.isLoading = true;
    },
    [FETCH_AVAILABILITY_FAILED](state) {
        state.isLoading = false;
    },
    [FETCH_AVAILABILITY_SUCCEEDED](state, { availability }) {
        state.isLoading = false;
        state.availability = availability;
    },
    [SELECT_TIME](state, { time }) {
        state.selectedTime = time;
    },
});

export default dateReducer;
