import RNIosSettingsBundle from 'react-native-ios-settings-bundle';

export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

export const bootstrap = () => dispatch => {
    RNIosSettingsBundle.get('EnvironmentChoice', (err, value) => {
        dispatch({ type: SET_ENVIRONMENT, environment: value });
        if (value !== 'development' && value === 'staging') {
            console.disableYellowBox = true;
        }
    });
};
