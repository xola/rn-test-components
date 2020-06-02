import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    demographics: {
        flex: 1,
    },
    addons: {
        flex: 1,
    },
    danger: {
        color: variables.redError,
    },
    headline: {
        marginBottom: 30,
    },
    label: {
        fontSize: 20,
        marginBottom: 8,
    },
    payment: {
        flex: 3,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentPanel: {
        flex: 4,
    },
    placeholderColor: {
        color: variables.textColorMuted,
    },
});

export default styles;
