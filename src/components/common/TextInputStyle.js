import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    label: {
        fontSize: variables.h6Size,
        fontFamily: variables.fontBold,
        paddingBottom: w(10)
    },
    container: {
        width: '99%',
        borderStyle: 'solid',
        borderWidth: w(1),
        borderColor: variables.lightGrey,
        borderRadius: variables.borderRadius,
        fontFamily: variables.fontBold,
        padding: w(24),
        color: variables.textColor,
        fontSize: variables.h6Size,
        height: w(70)
    },
});

export default styles;
