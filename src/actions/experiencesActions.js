import xolaApi from '../api/xolaApi';

export const FETCH_EXPERIENCE_REQUESTED = 'FETCH_EXPERIENCE_REQUESTED';
export const FETCH_EXPERIENCE_SUCCEEDED = 'FETCH_EXPERIENCE_SUCCEEDED';
export const FETCH_EXPERIENCE_FAILED = 'FETCH_EXPERIENCE_FAILED';

export const SELECT_EXPERIENCE = 'SELECT_EXPERIENCE';

export const fetchExperiences = () => async dispatch => {
    try {
        dispatch({ type: FETCH_EXPERIENCE_REQUESTED });
        let response = await xolaApi.get('api/experiences', { params: { limit: 100, authenticate: true } });
        let data = response.data.data;
        while (response.data.paging.next) {
            response = await xolaApi.get(response.data.paging.next, { params: { limit: 100,  authenticate: true } });
            data = [...data, ...response.data.data];
        }
        dispatch({ type: FETCH_EXPERIENCE_SUCCEEDED, experiences: data });
    } catch (e) {
        dispatch({ type: FETCH_EXPERIENCE_FAILED, error: e.message });
    }
};

export const selectExperience = experienceId => (dispatch, getState) => {
    const { experiences } = getState();
    const selectedExperience = experiences.collection[experienceId];
    dispatch({ type: SELECT_EXPERIENCE, experience: selectedExperience });
};
