import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: variables.borderRadius,
        borderWidth: 1,
        borderColor: variables.lightGrey,
        marginVertical: w(10),
        padding: w(8)
    },
    name: {
        fontSize: variables.h5Size,
        color: variables.textColor,
        fontFamily: variables.fontBold,
        paddingLeft: w(12)
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paired: {
        color: variables.brandSuccess,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: w(16)
    },
    pairedContainer: {
        marginLeft: w(12),
        padding: w(8),
        borderRadius: w(80),
        backgroundColor: variables.lightGreen
    },
    isPaired: {
        fontFamily: variables.fontLight,
        fontSize: w(20),
        paddingHorizontal: w(8),
        color: variables.green
    }
});

export default styles;
