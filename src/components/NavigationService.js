import { createNavigationContainerRef } from '@react-navigation/native';

function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}

export const navigationRef = createNavigationContainerRef();

export default {
    navigate,
    goBack
};
