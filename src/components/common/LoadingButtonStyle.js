import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "red",
        borderWidth: 2,
        maxHeight: 60
    },
    loadingButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: variables.mainBlue,
        borderRadius: w(12),
        overflow: 'hidden',
        color: variables.white,
        borderColor: variables.textModal,
        borderWidth: 1,
    },
    small: {
        paddingTop: 8,
        fontSize: 12,
    },
    medium: {
        paddingTop: 10,
        fontSize: 14,
    },
    large: {
        paddingTop: 12,
        fontSize: w(16),
        fontWeight: '700',
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
        textDecorationLine: 'underline',
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
    },
    regular: {
    },
    narrow: {
        width: w(340),
    },
    flex: {
        flex: 1,
        width: '99%',
    },
    pairName: {
        fontFamily: variables.fontBold,
    },
    pairButton: {
        borderColor: variables.lightGrey,
        borderWidth: 1,
        borderRadius: variables.borderRadius,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    width300: {
        width: w(300),
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;
