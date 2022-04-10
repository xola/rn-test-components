import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: w(20)
    },
    top: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: w(20)
    },
    title: {
        fontSize: variables.h1Size,
        fontFamily: variables.fontBold,
        color: variables.textColor
    },
    label: {
        fontSize: variables.h6Size,
        fontFamily: variables.fontBold,

        paddingBottom: w(10)
    },
    pos: {
        flex: 1,
    },
    headline: {
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.titleText,
        paddingVertical: w(20)
    },
    devices: {
        flex: 2,
    },
    discover: {
        marginTop: 40,
    },
});

export default styles;
