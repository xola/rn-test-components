import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';
import { w } from '../../utils/Scale';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    columnDate: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    next: {
        paddingVertical: w(13),
        paddingHorizontal: w(17),
        borderRadius: w(6),
        borderColor: variables.lightGrey,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    columnTime: {
        paddingTop: w(60)
    },
    newDates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    isLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    dates: {
        flexDirection: 'row',
    },
    date: {
        flex: 1,
    },
    label: {
        fontFamily: variables.fontBold,
        fontSize: w(32),
        color: variables.titleText,
        paddingHorizontal: w(80)
    },
    noDate: {
        fontSize: variables.h3Size,
        fontFamily: variables.fontLight,
        color: variables.textColor,
    },
    row: {
        flex: 1,
        alignItems: "flex-start"
    },
    dateText: {
        fontSize: variables.h6Size,
        fontFamily: variables.fontBold,
        paddingVertical: w(20)
    },
    datesContainer: {
        paddingTop: w(100)
    }
});

export default styles;
