import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    experience: {
        flexDirection: 'row',
        paddingBottom: 20,
        marginBottom: 20,
        borderStyle: 'solid',
        borderBottomColor: variables.textColor,
        borderBottomWidth: 1,
    },
    image: {
        width: 200,
        height: 150,
        margin: 10,
        marginBottom: 15,
    },
    breakdown: {
        flex: 3,
        padding: 10,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headline: {
        fontSize: 30,
        marginBottom: 30,
    },
    total: {
        marginTop: 10,
        fontWeight: 'bold',
    },
});

export default styles;
