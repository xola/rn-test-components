import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        flex: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    image: {
        width: variables.fullWidth * 0.4,
        height: variables.fullHeight * 0.4,
        resizeMode: 'contain',
    },
    actions: {
        flex: 1,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default styles;
