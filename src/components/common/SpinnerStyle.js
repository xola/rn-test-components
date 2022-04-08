import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const size = w(80);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: w(20),
        flex: 1,
    },
    value: {
        // width: size,
        height: size,
        textAlign: 'center',
        lineHeight: size,
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.textColor
    },
    button: {
        width: size,
        height: size,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: variables.lightGrey,
        borderRadius: variables.borderRadius,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelContainer: {
        height: size,
        justifyContent: 'center',
        paddingLeft: size / 2,
    },
    buttonText: {
        fontSize: 30,
        lineHeight: 34,
        color: variables.textColor,
    },
    danger: {
        color: variables.redError,
    },
});

export default styles;
