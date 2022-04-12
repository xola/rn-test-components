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
        flex: 3,
        paddingLeft: w(20)
    },
    counterContainer: {
        flexDirection: 'row',
        flex: 1,
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
        marginTop: w(20),
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
});

export default styles;
