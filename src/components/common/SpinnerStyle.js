import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const size = 56;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10,
    },
    value: {
        width: size,
        height: size,
        textAlign: 'center',
        lineHeight: size,
        marginLeft: 3,
        marginRight: 3,
    },
    button: {
        width: size,
        height: size,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: variables.borderColorMuted,
        borderRadius: variables.borderRadius,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
