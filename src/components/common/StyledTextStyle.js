import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
const styles = StyleSheet.create({
    basicText: {
        fontSize: variables.fontSize,
    },
    h1: {
        fontSize: variables.h1Size,
    },
    h2: {
        fontSize: variables.h2Size,
    },
    h3: {
        fontSize: variables.h3Size,
    },
    h4: {
        fontSize: variables.h4Size,
    },
    uppercase: {
        textTransform: 'uppercase',
    },
    required: {
        color: variables.redError,
        textAlignVertical: 'top',
    },
});

export default styles;
