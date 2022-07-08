import { StyleSheet, Platform } from 'react-native';
import variables from '../../styles/variables';

const styles = StyleSheet.create({
    container: {
        width: 280,
        padding: 40,
        ...Platform.select({
            ios: {
                backgroundColor: variables.white,
            },
            android: {

            }
        }),
        position: 'absolute',
        top: 2000,
        zIndex: 1
    },
    image: {
        width: 200,
        height: 200
    },
    name: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'normal'
    },
    infoText: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    ticketOrder: {
        fontSize: 16,
        alignSelf: 'center',
        marginBottom: 20,
    },
    demographics: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'normal',
    },
});

export default styles;
