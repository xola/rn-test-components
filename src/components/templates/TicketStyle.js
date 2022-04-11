import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        width: 280,
        padding: 40,
        backgroundColor: variables.white,
        position: 'absolute',
        top: 2000,
        zIndex: 1,
    },
    image: {
        width: 200,
        height: 200,
    },
    name: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ticketOrder: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 20,
    },
    demographics: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default styles;
