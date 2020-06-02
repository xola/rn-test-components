import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderStyle: 'solid',
        borderColor: variables.borderColorMuted,
        borderRadius: variables.borderRadius,
        borderWidth: 2,
        height: 60,
        margin: 5,
    },
    time: {
        flex: 1,
        fontSize: 20,
    },
    slots: {
        flex: 1,
        fontSize: 20,
        textAlign: 'right',
        color: variables.lightGreen,
    },
});

export default styles;
