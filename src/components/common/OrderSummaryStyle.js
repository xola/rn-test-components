import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        borderRadius: variables.borderRadius,
        backgroundColor: variables.grey,
        padding: w(28),
    },
    experience: {
        flexDirection: 'row',
        paddingBottom: 20,
        marginBottom: 20,
        borderStyle: 'solid',
        borderBottomColor: variables.lightGrey,
        borderBottomWidth: 1,
    },
    image: {
        width: w(80),
        height: w(80),
        borderRadius: w(4)
    },
    breakdown: {
        flex: 3,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalContainer: {
        marginTop: w(20),
        borderStyle: 'solid',
        borderTopColor: variables.lightGrey,
        borderTopWidth: 1,
    },
    total: {
        paddingTop: w(20),
        fontSize: variables.h5Size,
        fontFamily: variables.fontBold,
    },
    label: {
        paddingTop: w(10),
        fontSize: w(20),
        fontFamily: variables.fontLight,
        color: variables.textColor
    },
    value: {
        paddingTop: w(10),
        fontSize: w(20),
        fontFamily: variables.fontLight,
        color: variables.textColor
    },
});

export default styles;
