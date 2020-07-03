import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const listSize = variables.fullWidth - 30;

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: listSize,
    },
    noResult: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default styles;
