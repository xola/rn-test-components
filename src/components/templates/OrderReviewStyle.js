import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.titleText,
        paddingTop: w(20)
    },
    form: {
        paddingTop: w(40)
    },
    info: {
        paddingTop: w(40)
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
    row: {
        flexDirection: 'row'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
