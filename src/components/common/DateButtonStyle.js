import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        borderColor: variables.borderColorMuted,
        borderWidth: 2,
        borderStyle: 'solid',
        padding: 10,
        margin: 5,
        borderRadius: variables.borderRadius,
    },
    unselected: {
        borderColor: variables.borderColorMuted,
    },
    selected: {
        borderColor: variables.blue,
        backgroundColor: variables.brandPrimary,
        color: variables.white,
    },
    day: {
        fontSize: 15,
        textAlign: 'center',
    },
    month: {
        height: 25,
        fontSize: 20,
        marginLeft: 5,
    },
    date: {
        fontSize: 40,
        textAlign: 'center',
    },
});

export default styles;
