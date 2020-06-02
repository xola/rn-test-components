import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
const styles = StyleSheet.create({
    loadingButton: {
        textAlign: 'center',
        backgroundColor: variables.blue,
        borderRadius: 5,
        overflow: 'hidden',
        color: variables.white,
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
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 25,
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
        color: variables.brandPrimary,
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
        width: 250,
    },
    flex: {
        flex: 1,
    },
});

export default styles;
