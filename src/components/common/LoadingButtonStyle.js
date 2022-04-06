import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    loadingButton: {
        textAlign: 'center',
        backgroundColor: variables.mainBlue,
        borderRadius: w(12),
        overflow: 'hidden',
        color: variables.white,
        borderColor: variables.textModal,
        borderWidth: 1,
    },
    small: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 16,
    },
    medium: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
    },
    large: {
        fontSize: w(24),
        fontWeight: '700',
        paddingVertical: w(24),
    },
    active: {
        backgroundColor: variables.mainBlue,
    },
    success: {
        backgroundColor: variables.brandSuccess,
    },
    cancel: {
        backgroundColor: variables.redBright,
    },
    neutral: {
        backgroundColor: 'transparent',
        color: variables.textColor,
    },
    link: {
        backgroundColor: 'transparent',
        color: variables.textColor,
        borderWidth: 0,
        fontSize: variables.fontSize,
        textDecorationLine: 'underline'
    },
    empty: {
        backgroundColor: 'transparent',
        color: variables.textColor,
        borderColor: variables.textColor,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    noRadius: {
        borderRadius: 0,
    },
    wide: {
        width: 400,
    },
    narrow: {
        width: w(340),
    },
    flex: {
        flex: 1,
        width: '99%',
        maxHeight: w(80)
    },
});

export default styles;
