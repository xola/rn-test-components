import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.textColor,
        textAlign: 'center',
        paddingVertical: w(20)
    },
    message: {
        fontFamily: variables.fontLight,
        fontSize: w(26),
        color: variables.textColor,
        textAlign: 'center'
    }
});

export default styles;
