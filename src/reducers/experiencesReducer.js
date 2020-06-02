import {
    FETCH_EXPERIENCE_REQUESTED,
    FETCH_EXPERIENCE_SUCCEEDED,
    FETCH_EXPERIENCE_FAILED,
    SELECT_EXPERIENCE,
} from '../actions/experiencesActions';
import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';

/**
 *
 * selectedExperience - id of the experience that is selected
 */
export const initialState = {
    isLoading: false,
    collection: {},
    selectedExperience: null,
};

const experiencesReducer = createReducer(initialState, {
    [FETCH_EXPERIENCE_REQUESTED](state) {
        state.isLoading = true;
    },
    [FETCH_EXPERIENCE_FAILED](state) {
        state.isLoading = false;
    },
    [FETCH_EXPERIENCE_SUCCEEDED](state, { experiences }) {
        state.collection = _.mapKeys(experiences, experience => experience.id);
        state.isLoading = false;
    },
    [SELECT_EXPERIENCE](state, { experience }) {
        state.selectedExperience = experience.id;
    },
});

export default experiencesReducer;
