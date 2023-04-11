import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    label: {
        fontSize: variables.fontSmall,
        fontFamily: variables.fontBold,
        //paddingBottom: w(10)
    },
    error: {
        fontSize: variables.h6Size,
        fontFamily: variables.fontBold,
        //paddingBottom: w(10),
        color: variables.redError
    },
    container: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: w(1),
        borderColor: variables.lightGrey,
        borderRadius: variables.borderRadius,
        fontFamily: variables.fontLight,
        paddingHorizontal: w(24),
        color: variables.textColor,
        fontSize: variables.fontSize,
        textAlignVertical: 'center',
        height: w(110),
        //marginVertical: w(10)
    },
});

export default styles;
