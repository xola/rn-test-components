import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    quantity: {
        flex: 1,
    },
    info: {
        flex: 1,
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
        marginBottom: 10,
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: variables.textColorMuted,
        padding: 10,
        color: variables.textColor,
    },
    label: {
        fontSize: 20,
        marginLeft: 10,
    },
    description: {
        color: variables.textColorMuted,
        marginLeft: 10,
    },
    inputGroup: {
        marginTop: 20,
    },
});

export default styles;
