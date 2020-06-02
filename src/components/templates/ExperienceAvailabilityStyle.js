import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingBottom: 20,
    },
    columnDate: {
        flex: 3,
    },
    columnTime: {
        flex: 2,
        marginLeft: 10,
    },
    newDates: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    isLoading: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dates: {
        flexDirection: 'row',
    },
    date: {
        flex: 1,
    },
    label: {
        marginBottom: 20,
        marginTop: 30,
    },
    time: {
        flex: 7,
    },
    timeSlots: {
        marginTop: 25,
        height: '100%',
    },
    dateLink: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateLinkText: {
        fontSize: variables.h3Size,
        fontWeight: 'bold',
        color: variables.blue,
        paddingHorizontal: 5,
    },
    dateLinkIcon: {
        paddingTop: 3,
        fontSize: 30,
        color: variables.blue,
    },
});

export default styles;
