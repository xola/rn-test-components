import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const listSize = variables.fullWidth - 30;

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: listSize,
    },
});

export default styles;
