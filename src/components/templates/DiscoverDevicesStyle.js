import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    pos: {
        flex: 1,
        marginRight: 20,
    },
    headline: {
        marginBottom: 30,
    },
    devices: {
        flex: 2,
    },
    discover: {
        marginTop: 40,
    },
});

export default styles;
