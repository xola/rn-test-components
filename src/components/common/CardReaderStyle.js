import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {},
    actions: {
        width: 500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paired: {
        color: variables.brandSuccess,
    },
});

export default styles;
