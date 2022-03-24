import { createNavigationContainerRef } from '@react-navigation/native';

function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
export const navigationRef = createNavigationContainerRef();

export default {
    navigate,
};
