import { StyleSheet } from 'react-native';
import variables from '../styles/variables';
import { w } from '../utils/Scale';

const styles = StyleSheet.create({
    container: {
        backgroundColor: variables.white,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        left: 0,
        bottom: w(40)
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        width: '75%'
    },
    title: {
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.textColor,
        textAlign: 'center',
        paddingVertical: w(20)
    },
    subTitle: {
        fontSize: variables.fontSize,
        color: variables.textModal,
        marginVertical: 20,
        lineHeight: 28,
    },
    back: {
        paddingVertical: w(23),
        paddingHorizontal: w(27),
        borderRadius: w(10),
        borderColor: variables.lightGrey,
        backgroundColor: variables.white,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: w(60),
        width: w(100),
        flexDirection: 'row',
        position: 'absolute',
        left: w(20),
        top: w(20),
        zIndex: 999,
    },
    top: {
        position: 'absolute',
        width: '100%',
        left: 0,
        top: w(20)
    },
    bottom: {
        position: 'absolute',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        left: 0,
        bottom: w(20),
        borderTopWidth: 1,
        borderTopColor: variables.lightGrey,
    }
});

export default styles;
