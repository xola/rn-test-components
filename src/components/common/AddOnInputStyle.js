import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
    },
    label: {
        lineHeight: 40,
        marginLeft: 20,
        fontSize: 20,
    },
    danger: {
        color: variables.redError,
    },
    action: {
        width: 180,
    },
});

export default styles;
