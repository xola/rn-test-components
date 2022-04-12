import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkBox: {
        width: w(30),
        height: w(30),
        borderRadius: w(5),
        borderWidth: 1,
        borderColor: variables.lightGrey,
        backgroundColor: variables.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginLeft: w(20),
        fontSize: variables.h6Size,
        fontFamily: variables.fontBold,
        color: variables.textColor
    },
    description: {
        marginLeft: w(20),
        fontSize: w(20),
        lineHeight: w(26),
        fontFamily: variables.fontLight,
        color: variables.textColor
    },
    danger: {
        color: variables.redError,
    },
    action: {
        borderWidth: 1,
        borderRadius: variables.borderRadius,
        borderColor: variables.lightGrey,
        flex: 1,
    },
    content: {
        padding: w(20),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // flex: 1,
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 2,
    },
    quantityContainer: {
        alignItems: 'center'
    },
    quantity: {
        textAlign: 'center',
        fontFamily: variables.fontBold,
        fontSize: variables.h3Size,
        color: variables.textColor
    }
});

export default styles;
