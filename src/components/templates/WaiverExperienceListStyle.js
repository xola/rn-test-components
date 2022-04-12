import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const listSize = variables.fullWidth - 30;

const styles = StyleSheet.create({
    noResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 35,
        marginBottom: 25,
    },
    headerTitle: {
        fontWeight: '700',
        fontSize: 34,
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default styles;
