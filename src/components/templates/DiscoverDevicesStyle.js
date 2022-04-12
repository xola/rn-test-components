import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: w(20)
    },
    top: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: w(20)
    },
    title: {
        fontSize: variables.h1Size,
        fontFamily: variables.fontBold,
        color: variables.textColor
    },
    label: {
        fontSize: variables.h6Size,
        fontFamily: variables.fontBold,

        paddingBottom: w(10)
    },
    pos: {
        flex: 1,
    },
    headline: {
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.titleText,
        paddingVertical: w(20),
        borderColor: variables.lightGrey
    },
    devices: {
        flex: 2,
    },
    discover: {
        marginTop: 40,
    },
    printerButton: {
        width: '100%',
        backgroundColor: variables.white,
        borderWidth: 1,
        borderRadius: variables.borderRadius,
        height: w(60),
    },
    buttonText: {
        fontSize: variables.h6Size,
        fontFamily: variables.fontLight,
        textAlign: 'left'
    },
    rowStyle: {

        justifyContent: 'space-between',
        alignItems: 'center'
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
});

export default styles;
