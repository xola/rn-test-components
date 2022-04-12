import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    label: {
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.titleText,
        paddingTop: w(20)
    },
    demographic: {
        fontFamily: variables.fontBold,
        fontSize: variables.h6Size,
        color: variables.titleText,
    },
    caption: {
        marginLeft: w(20),
        fontFamily: variables.fontLight,
        fontSize: variables.fontSmall,
        color: variables.titleText,
    },
    labelContainer: {
        flexDirection: 'row',
    },
    quantity: {
        flex: 1,
    },
    info: {
        flex: 1,
    },
    demographics: {
        flex: 1,
    },
    addons: {
        flex: 1,
    },
    danger: {
        color: variables.redError,
    },
    headline: {
        marginBottom: 10,
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: variables.textColorMuted,
        padding: 10,
        color: variables.textColor,
    },
    description: {
        color: variables.textColorMuted,
        marginLeft: 10,
    },
    inputGroup: {
        marginTop: 20,
    },
});

export default styles;
