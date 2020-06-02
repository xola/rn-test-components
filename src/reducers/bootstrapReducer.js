import { createReducer } from '@reduxjs/toolkit';
import { SET_ENVIRONMENT } from '../actions/bootstrapActions';

export const initialState = {
    environment: 'production',
};

const bootstrapReducer = createReducer(initialState, {
    [SET_ENVIRONMENT](state, { environment }) {
        if (environment) {
            state.environment = environment;
        }
    },
});

export default bootstrapReducer;
