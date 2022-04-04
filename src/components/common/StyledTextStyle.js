import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    basicText: {
        fontSize: w(variables.fontSize),
    },
    large: {
        fontSize: w(variables.largeText),
        fontFamily: variables.fontBold,
        color: variables.textColor,
    },
    h1: {
        fontSize: w(variables.h1Size),
    },
    h2: {
        fontSize: w(variables.h2Size),
    },
    h3: {
        fontSize: w(variables.h3Size),
    },
    h4: {
        fontSize: w(variables.h4Size),
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
