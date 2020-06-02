import { StyleSheet } from 'react-native';
import variables from '../styles/variables';

const styles = StyleSheet.create({
    container: {
        marginTop: variables.fullHeight * 0.2,
        backgroundColor: variables.white,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: variables.grayBase,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 5,
    },
    time: {
        fontSize: 60,
        marginBottom: 10,
        textAlign: 'center',
    },
    action: {
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
        margin: 15,
    },
    info: {
        fontSize: 20,
        padding: 20,
        textAlign: 'center',
    },
    notices: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    notice: {
        padding: 15,
        margin: 15,
        borderWidth: 1,
        fontSize: 20,
        borderStyle: 'solid',
        textAlign: 'center',
        color: variables.white,
        borderRadius: 5,
        alignSelf: 'center',
    },
    neutral: {
        backgroundColor: variables.brandInfo,
        borderColor: variables.brandPrimary,
    },
    alert: {
        backgroundColor: variables.brandDanger,
        borderColor: variables.redBright,
    },
    success: {
        backgroundColor: variables.brandSuccessDisabled,
        borderColor: variables.brandSuccess,
    },
    image: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 30,
    },
    footer: {
        flexDirection: 'row-reverse',
        backgroundColor: variables.lightestGray,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
});

export default styles;
