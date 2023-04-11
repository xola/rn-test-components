import { Platform } from 'react-native';

export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

export const bootstrap = () => dispatch => {

};

export const setEnvironment = value => dispatch => dispatch({ type: SET_ENVIRONMENT, environment: value });
